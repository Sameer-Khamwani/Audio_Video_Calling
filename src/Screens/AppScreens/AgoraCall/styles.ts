import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  pulseDotBase: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
    marginLeft: 6,
  },
  bgBlurredImage: {
    position: "absolute",
    width: "100%",
    height: "110%",
    resizeMode: "cover",
  },
  videoLayoutShell: {
    flex: 1,
  },
  remoteCameraOffText: {
    marginTop: 20,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  localRtcSurface: {
    flex: 1,
  },
  cameraOffLabel: {
    marginTop: 4,
  },
  audioCallAvatar: {
    height: heightPixel(270),
    width: heightPixel(270),
    resizeMode: "cover",
    borderRadius: heightPixel(140),
    overflow: "hidden",
    backgroundColor: colors.black,
  },
  callHeaderOverlay: {
    position: "absolute",
    top: heightPixel(45),
    left: 0,
    right: 0,
    alignItems: "center",
    alignSelf: "center",
    zIndex: 20,
  },
  callHeaderStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingVertical: heightPixel(8),
    paddingHorizontal: widthPixel(14),
    borderRadius: heightPixel(14),
  },
  callHeaderTimerText: {
    marginTop: heightPixel(4),
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingVertical: heightPixel(4),
    paddingHorizontal: widthPixel(12),
    borderRadius: heightPixel(12),
  },
  controlsRowOverlay: {
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingVertical: heightPixel(14),
    paddingHorizontal: widthPixel(16),
    borderRadius: heightPixel(28),
  },
  controlsRowGapVideo: {
    gap: widthPixel(20),
  },
  controlsRowGapAudio: {
    gap: widthPixel(35),
  },
  controlButtonColumn: {
    alignItems: "center",
    gap: 4,
  },
  controlButtonBox: {
    borderRadius: heightPixel(100),
    height: heightPixel(52),
    width: heightPixel(52),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: colors.black,
  },
  localVideo: {
    width: widthPixel(130),
    height: heightPixel(180),
    position: "absolute",
    top: heightPixel(80),
    right: widthPixel(20),
    borderRadius: heightPixel(10),
    overflow: "hidden",
    backgroundColor: colors.black,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  audioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: widthPixel(20),
  },
  title: {
    marginTop: heightPixel(14),
  },
  subtitle: {
    marginTop: heightPixel(20),
    textAlign: "center",
  },
  controlsRow: {
    position: "absolute",
    bottom: heightPixel(60),
    left: widthPixel(20),
    right: widthPixel(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  controlButton: {
    flex: 1,
    minHeight: heightPixel(44),
  },
  endButton: {
    borderColor: colors.red,
  },
  headerActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: widthPixel(10),
    marginRight: widthPixel(14),
  },
  headerActionText: {
    color: colors.primary,
  },
  videoOffImage: {
    width: "100%",
    height: "100%",
    borderRadius: heightPixel(10),
  },
  waitingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#323230',
  },
  remoteVideoOffContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightText,
  },

  waitingProfile: {
    width: heightPixel(280),
    height: heightPixel(280),
    borderRadius: heightPixel(100),
  },
  // Add inside StyleSheet.create({...})

  bgImage: {
    // placeholder — actual style is inlined above for absolute positioning
  },
  networkBadge: {
    position: "absolute",
    top: heightPixel(48),
    left: widthPixel(16),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: widthPixel(10),
    paddingVertical: heightPixel(4),
    borderRadius: 20,
    gap: 5,
  },
  networkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  videoOffPlaceholder: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    justifyContent: "center",
    alignItems: "center",
  },
  videoOffAvatarSmall: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(25),
  },
});
