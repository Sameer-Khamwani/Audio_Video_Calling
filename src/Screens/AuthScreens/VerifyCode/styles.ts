import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import { colors } from "../../../Utils/theme";

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingBottom: heightPixel(20),
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: widthPixel(20),
    },
    subtitle: {
        textAlign: "center",
        // marginBottom: heightPixel(50),
        width: "80%",
    },
    card: {
        width: "100%",
        // backgroundColor: colors.white,
        marginBottom: heightPixel(20),
        borderColor: colors.lightBorder,
        borderRadius: heightPixel(14),
        padding: heightPixel(20),
    },
    otpRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: heightPixel(10),
        marginTop: heightPixel(25),
    },
    otpBox: {
        width: widthPixel(48),
        height: heightPixel(56),
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: heightPixel(12),
        backgroundColor: colors.white,
        textAlign: "center",
        fontSize: heightPixel(24),
        color: colors.black,
        elevation: 4,
        fontWeight: 'bold'
    },
    errorText: {
        marginTop: heightPixel(10),
    },
    resendText: {
        textDecorationLine: "underline",
        width: "100%",
        textAlign: "right",
        marginTop: heightPixel(10),
    },
    verifyButton: {
        width: "100%",
        marginTop: heightPixel(30),
    },
    backToLogin: {
        marginTop: heightPixel(8),
    },
    secureSection: {
        marginTop: heightPixel(100),
        alignItems: "center",
        justifyContent: "flex-end",
    },
    secureTitle: {
        marginTop: heightPixel(18),
        width: "100%",
        textAlign: "center",
    },
    secureDescription: {
        width: "100%",
        textAlign: "center",
    },
    emptyDayState: {
        paddingVertical: heightPixel(20),
        width: "100%",
        alignItems: "center",
    },
    iconSpacing: {
        marginBottom: heightPixel(20),
    },
});

export default styles;
