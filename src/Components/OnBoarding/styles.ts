import { StyleSheet } from "react-native";
import { widthPixel, heightPixel } from "../../Utils/helper";
import colors from "../../Utils/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.black,
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    card: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: widthPixel(30),
        borderTopRightRadius: widthPixel(30),
        paddingHorizontal: widthPixel(24),
        paddingTop: heightPixel(40),
        paddingBottom: heightPixel(35),
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 12,
    },
    title: {
        textAlign: 'center',
        marginBottom: heightPixel(10),
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: heightPixel(24),
    },
    button: {
        width: '100%',
        marginBottom: heightPixel(20),
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: widthPixel(6),
        marginVertical: heightPixel(20),
    },
    dot: {
        width: widthPixel(8),
        height: widthPixel(8),
        borderRadius: widthPixel(5),
        backgroundColor: colors.lightGray,
    },
    activeDot: {
        width: widthPixel(28),
        borderRadius: widthPixel(5),
        backgroundColor: colors.primary,
    },
    skip: {
        textAlign: 'center',
    },
});