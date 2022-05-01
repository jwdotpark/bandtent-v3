# Table of Contents

- [Project Description](#ProjectDescription)
- [Project Structure](#ProjectStructure)
- [Deployment](#Deployment)
  - [Local Deployment](#LocalDeployment)
  - [Github Action Deployment](#GithubActionDeployment)
- [Cloud Services](#CloudServices)
- [Cloud Infrastructure](#CloudInfrastructure)
- [Consideration of Vender Lock-In and Pricing](#ConsiderationofVenderLock-InandPricing)
- [Continuous Integeration and Condinuous Deployment](#ContinuousIntegerationandCondinuousDeployment)

---

## Project Description

Bandtent(working title!) is a solo project that aims to provide a platform for users to share their own music at ease. The ultimate goal of the project is to reduce the cost of music distribution via diversifying the payment method, though it's working in progress at the moment. For this semester I focused on the skeleton of the project around the technologies that I am not familiar with yet.

![Main page](./assets/main.png)

## Project Structure

The app is based on Next.js for front-end, Heroku Postgresql for database, Prisma for ORM, AWS Lambda for SSR/ISR page hydration functions and REST API for CRUD operations, and S3 for serving static assets. The app is deployed on AWS using serverless framework.

![Project structure diagram](./assets/diagram.png)

## Deployment

The app is deployed on AWS using [serverless framework](https://www.serverless.com/) with AWS, it approximately takes around 8 minutes including testing. On vercel, it takes around 2 minutes because current status is almost skeleton. However, with serverless clustering cloudformation takes much more time than that and I couldn't figure out how to make it faster unfortunately.

- Preview/Test stage(https://d22gsn0lozmysd.cloudfront.net/) via local deploy
- Development stage(https://d3b23r0s2n4zzp.cloudfront.net/) via Github Action
- Production stage(https://dg80q3nx38lx7.cloudfront.net) via Github Action

Serverless deployment build process has two main parts:

1. Start next.js standard build process.
2. Push generated static files to designated S3 bucket.
3. Generate lambda layer for SSR/ISR functions and other APIs at `/pages/api` and deploys it to AWS Lambda@us-east-1, which is replicated to all the other regions after.
4. Generate cloudfront distribution for bundling static files and functions.

### Local Deployment

Requirements:

- Node@^14
- Postgresql DB url
- AWS IAM Role credential with permision

```
AWS_ACCESS_KEY_ID=my-access-id-key
AWS_SECRET_ACCESS_KEY=my-secret-key
DATABASE_URL=postgres://user:password@host:port/my-database
```

Clone the repository, install dependencies and deploy in local environment. Details are specified in `package.json`.

```
yarn install && yarn deploy
```

`yarn install` installs all the necessary dependencies and `postinstall` script is automatically triggerd after for generating `@prisma/client` with `schema.prisma`.

`yarn deploy` triggers `npx serverless@2.72.2` which uses `serverless.yml` and starts next.js build process. After build, it makes a connection with AWS for initializing cloudfront and necessary services such lambda@edge and s3 buckets and push it.

The reason I explicitly use `serverless@2.72.2` is well explained [here](https://github.com/serverless-nextjs/serverless-next.js/issues/2320). I'm using next.js@12 for the project which doesn't properly supported by latest serverless framework.

When deploy in local environment, build process uses `serverless.yml` at root. It specifies the distribution id, which uses same cloudfront distribution for each build. This id is not initialized at first event so it has to be added after the first deploy.

### Github Action Deployment

Github Action deployment happens when new commit is pushed to or has a pull request on `main` or `dev` branch. It basically replicates the deploy process in local environment, except a few steps such as testing/caching process and parameters such as node environment, cloudfront distribution id and database url.

For some reason when deploys via Github Action, there was a problem that prisma doesn't copy its dependant binary when install process, so prisma client keeps throwing error that it misses schema.prisma in lambda layer. This was fixed via this [issue](https://github.com/prisma/prisma/issues/5392) - copy the binary from build artifact to lambda layer - which triggered after the build process.

After deploy in Github Action, you can check out the deployed site by clicking the link in the Github Action log. You can set the custom domain name in `serverless-{stage}.yml` if you want to. I didn't do the process it costs a bit..

On default, if you don't name the lambda layer and cloundfront distribution, it generates a new instance everytime it is deployed. But after the first deployment, you can upload your distribution id on s3 bucket and use it for the next deployment. You can have machine-generated random but static address at least.

## Cloud Services

Cloudfront Distributions on eu-central-1
![Cloudfront](./assets/cloud_front.png)

Lambda Layer
![lambda layer](./assets/lambda.png)

S3 buckets on eu-central-1
![s3 buckets](./assets/s3.png)

Cloudwatch of production branch
![cloudwatch](./assets/cloud_watch.png)

## Cloud Infrastructure

![Cloud infrastructure diagram](./assets/lambda_edge.png)

> With Lambda@Edge, you can enrich your web applications by making them globally distributed and improving their performance — all with zero server administration. Lambda@Edge runs your code in response to events generated by the Amazon CloudFront content delivery network (CDN). Just upload your code to AWS Lambda, which takes care of everything required to run and scale your code with high availability at an AWS location closest to your end user.

Cloudfront and S3 buckets are located at central europe but lambda functions I can see in the console was located at us-east-1 at first. I With many trial and errors of destroying/deploying infrastructure, I found that lambda layer I created with cloudfront is located at us-east-1 as in console but it's actually located at every possible region.

So functions are available at each zone for availability. However at the moment I settled the database and s3 bucket down on central europe only so that could be an improvement for later usage.

Serverless deployment seemed fast, flexible and easy to deploy. There are also great serverless deployment providers such as vercel, netlify, firebase and so on but it has its own limitation, such as the number of API or pages I can have, build time limit etc. But using cloudfront and lambda could overcome these hard limits for the price of deployment time.

I don't use getInitialProps function in next.js which takes a lot of build time so it could be problematic on AWS if it's important. But now next.js support incremental static regeneration function so it could be mitigated without much problem.

## Consideration of Vender Lock-In and Pricing

Tldr: it's easy to be locked in AWS if I choose serverless architecture. I would choose Vercel if it's possible. If I have to choose one of PaaS, serverless architecture on AWS would be the second best option for me.

If it might be too much of trouble, It'd be better to deploy with container structure using ECS or EKS on AWS, in case you want to deploy on other platform.

GCP has Cloud Functions/Cloud CDN service, Azure has Azure Functions/Azure CDN service so It would be possible to migrate to one platform to another, on paper. Though in terms of integrity on my research journey, It is hard to say that it's mature enough to be widely adapted in production. I could check out many information or community around AWS but there aren't many about Azure or GCP.

If scalability is the top priority, I'd deploy on AWS with serverless architecture. Vercel's pricing gets expensive exponentially if traffic spikes. If the project uses light-weighted short-lived API calls and doesn't have many pages, I'd just stay in Vercel for convenience.

Next.js is open source project, created by Vercel and they run their own platform for the framework. Next.js works just like 'magic' on Vercel, things I tried worked out of the box directly. Many libraries are depending on its architecture as well.

Interestingly, AWS also supports next.js on Amplify for a similar user experience. But after the research, I concluded that it lacks of documentation and support and there is a long way to be on the same level of support Vercel is currently offering. Using serverless is a lot less stressful than Amplify and it's much more configurable.

As a semester project, I had to consider that serverless deployment on AWS is out of free-tier and pay-as-you-go service, which was a bit pressure to me because I had a scary experience with former project 'Goodbuy', which I ended up spent around 80 euro only with 3 instances of ec2 and route53 services at the end of the semester. (It got resolved a while later with service rep as a one time chance for student though!) This time, I abused S3 buckets and lambda functions a lot, even in the testing and this time the bill is less than 1 euro per month so I could say it's quite cost effective, for a tiny scale website.

## Continuous Integeration and Condinuous Deployment

![CI/CD flowchart](./assets/ci-cd-chart.png)

I used CI/CD pipeline for Github Action, using its template. From what I understood, it's a script that executes commands in a linear way just like I do in the terminal, while you could import external dependencies and use them in your script.

![CI/CD](/assets/cicd.png)

There are two workflows in the repository - bandtent-production and bandtent-dev. Former is from the branch 'main' and it's for production stage. Dev goes for same way. Each workflow is automatically triggered when there is a new commit or pull request on the branch.

![CI/CD dev](/assets/cicd-dev.png)

You can provide secrets environment variable before the deployment. This part was took me a while to figure - almost a week - because I wasn't able to find a way to pass secrets to the script for some reason. Turned out it was just prisma(missing binary). I eneded up using another step to create `.env` forcefully in the middle of build process and successfully deployed after.

Rest of Github Action yml consists of setting up the environment of Node and AWS configuration.

In bandtent-dev workflow, there is an additional testing step to make it sure it's working as expected.

Lastly, there is step that sets `serverless` framework artifacts after the build process. I could use it for consistency of the id of the deployment otherwise it's placed in random id at each every deployment. Without knowing this, I used to make a mistake that I once had more than 20 instances of cloudfront distribution..

After so many tedious deployment mistake, I found that there is a library called [act](https://github.com/nektos/act), which is a offline emulator for Github Action. It was a great tool to experiment with different deployment strategies. I wish I knew from the begnining!
