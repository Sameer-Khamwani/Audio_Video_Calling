import { StyleSheet, Platform } from "react-native";
import { widthPixel, heightPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

export const styles = StyleSheet.create({
  headerAvatar: {
    width: heightPixel(40),
    height: heightPixel(40),
    borderRadius: widthPixel(18),
  },

  msgRow: {
    width: '100%',
    gap: widthPixel(8),
  },

  // ── Bubbles ──
  bubbleMe: {
    backgroundColor: colors.primary,
    borderRadius: heightPixel(14),
    borderBottomRightRadius: heightPixel(4),
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(8),
    maxWidth: widthPixel(270),
    // marginBottom: heightPixel(2),
    marginVertical: heightPixel(4),
  },
  bubbleThem: {
    backgroundColor: colors.lightBorder,
    borderRadius: heightPixel(14),
    borderBottomLeftRadius: heightPixel(4),
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(8),
    maxWidth: widthPixel(270),
    marginBottom: heightPixel(2),
  },
  bubbleTime: {
    textAlign: 'right',
    width: '100%',
    // marginTop: heightPixel(3),
  },

  // ── Images ──
  msgImage: {
    width: widthPixel(200),
    height: widthPixel(200),
    borderRadius: heightPixel(10),
    marginVertical: heightPixel(4),
  },

  // ── Doc bubbles ──
  docBubbleMe: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: heightPixel(12),
    paddingHorizontal: widthPixel(10),
    paddingVertical: heightPixel(8),
    maxWidth: widthPixel(260),
    marginBottom: heightPixel(2),
  },
  docBubbleThem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray ?? '#F3F3F3',
    borderRadius: heightPixel(12),
    paddingHorizontal: widthPixel(10),
    paddingVertical: heightPixel(8),
    maxWidth: widthPixel(260),
    marginBottom: heightPixel(2),
  },

  // ── Input bar ──
  inputBar: {
    // borderTopWidth: 0.5,
    backgroundColor: colors.white,
    paddingTop: heightPixel(8),
    paddingHorizontal: widthPixel(8),
    paddingBottom: heightPixel(20),
    borderTopWidth: 1,
    borderTopColor: colors.lightBorder,
  },
  attachStrip: {
    marginBottom: heightPixel(8),
    paddingTop: heightPixel(18),
    // maxHeight: heightPixel(90),
  },
  attachThumb: {
    // width: widthPixel(70),
    borderRadius: heightPixel(8),
    zIndex: -10,
  },
  attachDoc: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBorder,
    borderColor: colors.white ?? '#E0E0E0',
    borderRadius: heightPixel(8),
    padding: heightPixel(12),
    elevation: 4,
    marginBottom: heightPixel(8),
    zIndex: -10,
  },
  removeBtn: {
    position: 'absolute',
    bottom: heightPixel(-5),
    zIndex: 10,
    right: widthPixel(-22),
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border ?? '#E0E0E0',
    borderRadius: heightPixel(20),
    paddingHorizontal: widthPixel(14),
    paddingVertical: Platform.OS === 'ios' ? heightPixel(9) : heightPixel(6),
    fontSize: heightPixel(14),
    color: colors.black,
    backgroundColor: '#F8F8F8',
    // maxHeight: heightPixel(100),
  },
  headerRow: {
    gap: widthPixel(14),
    paddingBottom: heightPixel(10),
    // paddingLeft: widthPixel(10),
  },
  headerName: {
    width: '90%',
  },
  headerActions: {
    gap: widthPixel(16),
    marginRight: widthPixel(16),
  },
  msgPadding: {
    paddingHorizontal: widthPixel(4),
  },
  msgBubbleRow: {
    gap: widthPixel(4),
  },
  attachStripContent: {
    gap: widthPixel(18),
    alignItems: 'flex-end',
    paddingHorizontal: widthPixel(20),
  },
  attachThumbContainer: {
    position: 'relative',
    borderRadius: heightPixel(8),
    // backgroundColor: colors.red,
    height: heightPixel(50),
    width: widthPixel(80),
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  inputBarRow: {
    gap: widthPixel(0),
  },
  chatInputContainer: {
    width: '75%',
    marginHorizontal: widthPixel(12),
  },
  screenContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContentPadding: {
    paddingHorizontal: widthPixel(10),
    paddingTop: heightPixel(10),
    paddingBottom: heightPixel(10),
  },
  docNameText: {
    marginLeft: widthPixel(6),
    maxWidth: widthPixel(140),
  },
  docTimestampText: {
    marginLeft: widthPixel(4),
  },
  attachDocName: {
    marginLeft: widthPixel(6),
    width: '80%',
    // maxWidth: widthPixel(110),
  },
  headerBackIconPadding: {
    paddingLeft: widthPixel(50),
  },
  msgColumnBase: {
    maxWidth: "80%",
  },
  msgTextAttachmentWidth: {
    width: widthPixel(200),
  },
});