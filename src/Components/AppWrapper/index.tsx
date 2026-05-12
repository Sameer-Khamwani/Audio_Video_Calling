import { StyleProp, ViewStyle } from "react-native"
import { styles } from "./style"
import { ReactNode } from "react"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { heightPixel, widthPixel } from "../../Utils/helper"
import { IAppWrapper } from "../../Utils/interface";
const AppWrapper = ({
    children,
    style,
    disableBottomPadding = false,
    bottomPadding,
    paddingHorizontal,
}: IAppWrapper) => {
    const insets = useSafeAreaInsets()
    const resolvedBottomPadding =
        bottomPadding ?? (disableBottomPadding ? 0 : heightPixel(20) + insets.bottom)
    const resolvedHorizontalPadding = paddingHorizontal ?? widthPixel(20)

    return (
        <SafeAreaView style={[styles.container, { paddingHorizontal: resolvedHorizontalPadding }, style]}>
            {children}
        </SafeAreaView>
    )
}

export default AppWrapper