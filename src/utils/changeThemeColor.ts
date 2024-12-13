export function changeThemeColor() {
  // localStorage에서 userInfo 가져오기
  const userInfo = localStorage.getItem('userInfo')
  if (!userInfo) return

  try {
    // JSON 파싱
    const parsedUserInfo = JSON.parse(userInfo)

    if (!parsedUserInfo) return

    // backgroundColor 값이 있으면 적용
    if (parsedUserInfo?.franchise?.ui_information?.background_color_code) {
      document.documentElement.style.setProperty(
        '--background',
        parsedUserInfo?.franchise?.ui_information?.background_color_code
      )
      document.documentElement.style.setProperty(
        '--foreground',
        parsedUserInfo?.franchise?.ui_information?.splash_subtitle_color_code
      )
      document.documentElement.style.setProperty(
        '--card',
        parsedUserInfo?.franchise?.ui_information?.background_color_code
      )
      document.documentElement.style.setProperty(
        '--card-foreground',
        parsedUserInfo?.franchise?.ui_information?.splash_subtitle_color_code
      )
      document.documentElement.style.setProperty(
        '--popover',
        parsedUserInfo?.franchise?.ui_information?.background_color_code
      )
      document.documentElement.style.setProperty(
        '--popover-foreground',
        parsedUserInfo?.franchise?.ui_information?.splash_subtitle_color_code
      )
      document.documentElement.style.setProperty('--primary', '#b6825a')
      document.documentElement.style.setProperty(
        '--primary-foreground',
        parsedUserInfo?.franchise?.ui_information?.splash_subtitle_color_code
      )
      document.documentElement.style.setProperty(
        '--secondary',
        parsedUserInfo?.franchise?.ui_information?.background_color_code
      )
      document.documentElement.style.setProperty(
        '--secondary-foreground',
        parsedUserInfo?.franchise?.ui_information?.splash_subtitle_color_code
      )
      document.documentElement.style.setProperty('--muted', '#b6825a')
      document.documentElement.style.setProperty(
        '--muted-foreground',
        parsedUserInfo?.franchise?.ui_information?.splash_subtitle_color_code
      )
      // document.documentElement.style.setProperty(
      //   '--accent',
      //   parsedUserInfo?.franchise?.ui_information?.background_color_code
      // )
      // document.documentElement.style.setProperty(
      //   '--accent-foreground',
      //   parsedUserInfo?.franchise?.ui_information?.splash_subtitle_color_code
      // )
      // document.documentElement.style.setProperty(
      //   '--destructive',
      //   parsedUserInfo?.franchise?.ui_information?.background_color_code
      // )
      // document.documentElement.style.setProperty(
      //   '--destructive-foreground',
      //   parsedUserInfo?.franchise?.ui_information?.splash_subtitle_color_code
      // )

      document.documentElement.style.setProperty('--border', '#b8a291')
      document.documentElement.style.setProperty('--input', '#b8a291')
      document.documentElement.style.setProperty(
        '--ring',
        parsedUserInfo?.franchise?.ui_information?.splash_subtitle_color_code
      )
    }
  } catch (error) {
    console.error('Failed to parse userInfo from localStorage', error)
  }
}
