import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import { colors } from "../../../Utils/theme";

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: heightPixel(20),
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: widthPixel(20),
    },
    heading: {
        marginBottom: heightPixel(20),
    },
    divider: {
        height: heightPixel(1.5),
        width: "100%",
        backgroundColor: colors.lightBorder,
        marginBottom: heightPixel(20),
        marginTop: heightPixel(100),
    },
    primaryButton: {
        width: "100%",
        marginVertical: heightPixel(20),
    },
    secondaryButton: {
        width: "100%",
    },
    backToLogin: {
        marginTop: heightPixel(10),
        textAlign: "center",
    },
    successModalButton: {
        width: "55%",
        justifyContent: "center",
        alignItems: "center",
    },
    iconSpacing: {
        marginBottom: heightPixel(30),
    },
    descriptionText: {
        textAlign: "center",
    },
});

export default styles;
