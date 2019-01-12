export const ThemeColors = () => {
    let rootStyle = getComputedStyle(document.body);
    return {
       themeColor1 : rootStyle.getPropertyValue("--theme-color-1").trim(),
       themeColor2 : rootStyle.getPropertyValue("--theme-color-2").trim(),
       themeColor3 : rootStyle.getPropertyValue("--theme-color-3").trim(),
       themeColor4 : rootStyle.getPropertyValue("--theme-color-4").trim(),
       themeColor5 : rootStyle.getPropertyValue("--theme-color-5").trim(),
       themeColor6 : rootStyle.getPropertyValue("--theme-color-6").trim(),
       themeColor1_10 : rootStyle.getPropertyValue("--theme-color-1-10").trim(),
       themeColor2_10 : rootStyle.getPropertyValue("--theme-color-2-10").trim(),
       themeColor3_10 : rootStyle.getPropertyValue("--theme-color-3-10").trim(),
       themeColor4_10 : rootStyle.getPropertyValue("--theme-color-3-10").trim(),
       themeColor5_10 : rootStyle.getPropertyValue("--theme-color-3-10").trim(),
       themeColor6_10 : rootStyle.getPropertyValue("--theme-color-3-10").trim(),
       primaryColor: rootStyle.getPropertyValue("--primary-color").trim(),
       foregroundColor: rootStyle.getPropertyValue("--foreground-color").trim(),
       separatorColor: rootStyle.getPropertyValue("--separator-color").trim()
   }
}