import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: heightPixel(15),
    },
    listContainer: {
        width: "100%",
        paddingVertical: heightPixel(20),
        gap: heightPixel(16),
        paddingHorizontal: widthPixel(20),
    },
    card: {
        width: "100%",
        backgroundColor: colors.white,
        elevation: 4,
        borderRadius: heightPixel(14),
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: heightPixel(14),
    },
    cardContent: {
        width: "100%",
    },
    metaRow: {
        marginVertical: heightPixel(3),
    },
    visitBadge: {
        backgroundColor: colors.lightBlue,
        borderRadius: heightPixel(10),
        alignItems: "center",
        justifyContent: "center",
        width: widthPixel(62),
        paddingVertical: heightPixel(5),
    },
    patientAvatar: {
        borderRadius: heightPixel(28),
        backgroundColor: colors.lightBlue,
    },
});

export default styles;
