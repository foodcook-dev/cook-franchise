export function changeThemeColor() {
  // localStorage에서 userInfo 가져오기
  const franchiseInfo = localStorage.getItem('franchiseInfo')
  if (franchiseInfo === undefined || !franchiseInfo) return

  try {
    // JSON 파싱

    if (franchiseInfo) {
      const parsedFranchiseInfo = JSON.parse(franchiseInfo)?.ui

      // console.log('parsedFranchiseInfo:', parsedFranchiseInfo)

      if (!parsedFranchiseInfo) return

      // backgroundColor 값이 있으면 적용
      if (parsedFranchiseInfo?.background) {
        document.documentElement.style.setProperty(
          '--background',
          parsedFranchiseInfo?.background
        )
        document.documentElement.style.setProperty(
          '--card',
          parsedFranchiseInfo?.background
        )
        document.documentElement.style.setProperty(
          '--popover',
          parsedFranchiseInfo?.background
        )
      }

      if (parsedFranchiseInfo?.foreground) {
        document.documentElement.style.setProperty(
          '--foreground',
          parsedFranchiseInfo?.foreground
        )
        document.documentElement.style.setProperty(
          '--card-foreground',
          parsedFranchiseInfo?.foreground
        )
        document.documentElement.style.setProperty(
          '--popover-foreground',
          parsedFranchiseInfo?.foreground
        )
      }

      if (parsedFranchiseInfo?.primary) {
        document.documentElement.style.setProperty(
          '--primary',
          parsedFranchiseInfo?.primary
        )
        document.documentElement.style.setProperty(
          '--primary-foreground',
          parsedFranchiseInfo?.primary_foreground
        )
      }

      if (parsedFranchiseInfo?.secondary) {
        document.documentElement.style.setProperty(
          '--secondary',
          parsedFranchiseInfo?.secondary
        )
        document.documentElement.style.setProperty(
          '--secondary-foreground',
          parsedFranchiseInfo?.secondary_foreground
        )
      }

      document.documentElement.style.setProperty(
        '--accent',
        parsedFranchiseInfo?.primary
      )
      document.documentElement.style.setProperty(
        '--accent-foreground',
        parsedFranchiseInfo?.accent_foreground
      )

      document.documentElement.style.setProperty(
        '--destructive',
        parsedFranchiseInfo?.destructive
      )
      document.documentElement.style.setProperty(
        '--destructive-foreground',
        parsedFranchiseInfo?.destructive_foreground
      )

      document.documentElement.style.setProperty(
        '--muted',
        parsedFranchiseInfo?.secondary_foreground
      )

      document.documentElement.style.setProperty(
        '--muted-foreground',
        parsedFranchiseInfo?.muted_foreground
      )

      document.documentElement.style.setProperty(
        '--border',
        parsedFranchiseInfo?.border
      )

      document.documentElement.style.setProperty(
        '--input',
        parsedFranchiseInfo?.input
      )

      document.documentElement.style.setProperty(
        '--ring',
        parsedFranchiseInfo?.ring
      )

      document.documentElement.style.setProperty(
        '--chart-1',
        parsedFranchiseInfo?.chart1
      )
      document.documentElement.style.setProperty(
        '--chart-2',
        parsedFranchiseInfo?.chart2
      )
      document.documentElement.style.setProperty(
        '--chart-3',
        parsedFranchiseInfo?.chart3
      )
      document.documentElement.style.setProperty(
        '--chart-4',
        parsedFranchiseInfo?.chart4
      )
      document.documentElement.style.setProperty(
        '--chart-5',
        parsedFranchiseInfo?.chart5
      )
    }
  } catch (error) {
    // console.error(
    //   'Failed to parse parsedFranchiseInfo from localStorage',
    //   error
    // )
  }
}
