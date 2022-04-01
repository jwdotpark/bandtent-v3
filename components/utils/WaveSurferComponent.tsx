// @ts-nocheck

import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { Box, Button, useColorMode } from '@chakra-ui/react'
// import WaveSurfer from 'wavesurfer.js'
import { WaveSurfer, WaveForm } from 'wavesurfer-react'

const WaveSurferComponent = (url) => {
  const { colorMode } = useColorMode()

  const [regions, setRegions] = useState([
    {
      id: 'region-1',
      start: 0.5,
      end: 10,
      color: 'rgba(0, 0, 0, .5)',
      data: {
        systemRegionId: 31,
      },
    },
    {
      id: 'region-2',
      start: 5,
      end: 25,
      color: 'rgba(225, 195, 100, .5)',
      data: {
        systemRegionId: 32,
      },
    },
    {
      id: 'region-3',
      start: 15,
      end: 35,
      color: 'rgba(25, 95, 195, .5)',
      data: {
        systemRegionId: 33,
      },
    },
  ])

  // use regions ref to pass it inside useCallback
  // so it will use always the most fresh version of regions list
  const regionsRef = useRef(regions)

  useEffect(() => {
    regionsRef.current = regions
  }, [regions])

  const regionCreatedHandler = useCallback(
    (region) => {
      console.log('region-created --> region:', region)

      if (region.data.systemRegionId) return

      setRegions([
        ...regionsRef.current,
        { ...region, data: { ...region.data, systemRegionId: -1 } },
      ])
    },
    [regionsRef]
  )

  const wavesurferRef = useRef()
  const handleWSMount = useCallback(
    (waveSurfer) => {
      if (waveSurfer.markers) {
        waveSurfer.clearMarkers()
      }

      wavesurferRef.current = waveSurfer

      if (wavesurferRef.current) {
        wavesurferRef.current.load('./audio.mp3')
        // wavesurferRef.current.load(url)

        // wavesurferRef.current.on('region-created', regionCreatedHandler)

        wavesurferRef.current.on('ready', () => {
          console.log('WaveSurfer is ready')
        })

        wavesurferRef.current.on('loading', (data) => {
          console.log('loading --> ', data)
        })

        if (window) {
          window.surferidze = wavesurferRef.current
        }
      }
    },
    [regionCreatedHandler]
  )

  const play = useCallback(() => {
    wavesurferRef.current.playPause()
  }, [])

  // const handleRegionUpdate = useCallback((region, smth) => {
  //   console.log('region-update-end --> region:', region)
  //   console.log(smth)
  // }, [])

  return (
    <Box border="1px solid green">
      <WaveSurfer onMount={handleWSMount}>
        <WaveForm id="waveform" hideCursor cursorColor="transparent"></WaveForm>
        <div id="timeline" />
        <Button onClick={play}>Play / Pause</Button>
      </WaveSurfer>
    </Box>
  )
}

export default WaveSurferComponent
