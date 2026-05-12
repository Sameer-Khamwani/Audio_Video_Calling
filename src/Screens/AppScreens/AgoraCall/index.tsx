import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  PermissionsAndroid,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  CameraCapturerConfiguration,
  CameraDirection,
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  VideoSourceType,
} from "react-native-agora";
import CustomText from "../../../Components/CustomText";
import {
  AGORA_APP_ID,
  AGORA_CHANNEL_PREFIX,
  AGORA_TEMP_TOKEN,
} from "../../../Config/agora";
import { goBack } from "../../../Utils/navigation";
import { CtrlProps } from "../../../Utils/interface";
import { colors } from "../../../Utils/theme";
import { styles } from "./styles";
import icons from "../../../Assets/Icons";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import dummyImages from "../../../Assets/DummyImages";
import { heightPixel } from "../../../Utils/helper";

type CallType = "audio" | "video";

// ─── tiny animated "..." status dot ───────────────────────────────────────────
const PulseDot = () => {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.2, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View style={[styles.pulseDotBase, { opacity }]} />
  );
};

// ─── network quality badge ─────────────────────────────────────────────────────
const qualityColor = (q: number) => {
  if (q <= 2) return "#4ADE80";
  if (q <= 4) return "#FACC15";
  return "#F87171";
};

const AgoraCall = () => {
  const route = useRoute<any>();
  const callType: CallType = route?.params?.callType ?? "audio";
  const channelName = useMemo(
    () => route?.params?.channelName ?? `${AGORA_CHANNEL_PREFIX}-demo-room`,
    [route?.params?.channelName]
  );

  const agoraRef = useRef<IRtcEngine | null>(null);
  const [joined, setJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);
  const [isRemoteVideoEnabled, setIsRemoteVideoEnabled] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  // FIX 1 – track camera state as TWO separate booleans so we can unmount the view
  const [localVideoEnabled, setLocalVideoEnabled] = useState(false); // true once engine is ready
  const [isVideoMuted, setIsVideoMuted] = useState(false);           // user toggled off

  const [_isFrontCamera, setIsFrontCamera] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [networkQuality, setNetworkQuality] = useState(0);

  // ─── permissions ────────────────────────────────────────────────────────────
  const requestCallPermissions = async () => {
    if (Platform.OS !== "android") return true;
    const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
    if (callType === "video") permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
    const result = await PermissionsAndroid.requestMultiple(permissions);
    return permissions.every(
      (p) => result[p] === PermissionsAndroid.RESULTS.GRANTED
    );
  };

  // ─── init ───────────────────────────────────────────────────────────────────
  const initCall = async () => {
    if (!AGORA_APP_ID || AGORA_APP_ID.includes("PASTE_YOUR_AGORA_APP_ID")) {
      Alert.alert("Agora Config Missing", "Please set AGORA_APP_ID in src/Config/agora.ts");
      goBack();
      return;
    }

    const hasPermissions = await requestCallPermissions();
    if (!hasPermissions) {
      Alert.alert("Permission Required", "Camera/microphone permission is required for calls.");
      goBack();
      return;
    }

    const engine = createAgoraRtcEngine();
    engine.initialize({ appId: AGORA_APP_ID });
    engine.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
    engine.enableAudio();
    engine.setEnableSpeakerphone(true);

    if (callType === "video") {
      engine.enableVideo();
      engine.setVideoEncoderConfiguration({
        dimensions: { width: 640, height: 480 },
        frameRate: 15,
        bitrate: 0,
        orientationMode: 0,
      });
      engine.setCameraCapturerConfiguration({
        cameraDirection: CameraDirection.CameraFront,
      } as CameraCapturerConfiguration);

      // FIX 2 – assign ref BEFORE any preview/setup calls so callbacks have it
      agoraRef.current = engine;

      engine.setupLocalVideo({
        canvas: { uid: 0, sourceType: VideoSourceType.VideoSourceCamera },
      } as any);
      // FIX 2 – explicitly enable local video before preview
      engine.enableLocalVideo(true);
      engine.startPreview();
      // FIX 2 – mark local video as ready so the RtcSurfaceView mounts immediately
      setLocalVideoEnabled(true);
    } else {
      agoraRef.current = engine;
    }

    engine.registerEventHandler({
      onJoinChannelSuccess: (_connection, _elapsed) => {
        setJoined(true);
        if (callType === "video") {
          // Ensure streams are publishing (safe to call again)
          agoraRef.current?.muteLocalAudioStream(false);
          agoraRef.current?.muteLocalVideoStream(false);
        }
      },

      onUserJoined: (_connection, uid) => {
        setRemoteUid(uid);
        setIsRemoteVideoEnabled(true);
        if (callType === "video") {
          agoraRef.current?.setupRemoteVideo({
            canvas: { uid, sourceType: VideoSourceType.VideoSourceRemote },
          } as any);
        }
      },

      onUserOffline: (_connection, _uid) => {
        setRemoteUid(null);
        setIsRemoteVideoEnabled(false);
      },

      onRemoteVideoStateChanged: (_connection, uid, state, reason) => {
        console.log("Remote video state:", uid, state, reason);
        // 2 = decoding frames; all other states should show placeholder
        setIsRemoteVideoEnabled(state === 2);
      },

      // FIX 3 – surface network quality to UI
      onNetworkQuality: (_connection, uid, txQ, rxQ) => {
        if (uid === 0) setNetworkQuality(Math.max(txQ, rxQ));
      },

      onConnectionLost: () => Alert.alert("Connection Lost", "Please check your network."),
      onError: (err) => Alert.alert("Call Error", `Code: ${err}`),
    });

    await engine.joinChannel(
      AGORA_TEMP_TOKEN.includes("PASTE_YOUR_TEMP_TOKEN") ? "" : AGORA_TEMP_TOKEN,
      channelName,
      0,
      {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        publishMicrophoneTrack: true,
        publishCameraTrack: callType === "video",
        autoSubscribeAudio: true,
        autoSubscribeVideo: callType === "video",
      }
    );
  };

  // ─── leave ───────────────────────────────────────────────────────────────────
  const leaveCall = async () => {
    const engine = agoraRef.current;
    if (engine) {
      if (callType === "video") engine.stopPreview();
      await engine.leaveChannel();
      engine.release();
      agoraRef.current = null;
    }
    goBack();
  };

  // ─── controls ────────────────────────────────────────────────────────────────
  const toggleMute = () => {
    const next = !isMicMuted;
    setIsMicMuted(next);
    agoraRef.current?.muteLocalAudioStream(next);
  };

  const toggleSpeaker = () => {
    const next = !isSpeakerOn;
    setIsSpeakerOn(next);
    agoraRef.current?.setEnableSpeakerphone(next);
  };

  // FIX 1 – properly unmount the RtcSurfaceView when camera is off
  const toggleVideo = async () => {
    const turningOff = !isVideoMuted;
    if (turningOff) {
      await agoraRef.current?.muteLocalVideoStream(true);
      await agoraRef.current?.enableLocalVideo(false);
      await agoraRef.current?.stopPreview();
      setLocalVideoEnabled(false); // UNMOUNT the view → no frozen frame
      setIsVideoMuted(true);
    } else {
      await agoraRef.current?.enableLocalVideo(true);
      await agoraRef.current?.startPreview();
      await agoraRef.current?.muteLocalVideoStream(false);
      setLocalVideoEnabled(true);  // REMOUNT fresh view
      setIsVideoMuted(false);
    }
  };

  const switchCamera = () => {
    setIsFrontCamera((p) => !p);
    agoraRef.current?.switchCamera();
  };
  // ─── lifecycle ───────────────────────────────────────────────────────────────
  useEffect(() => {
    initCall();
    return () => {
      const engine = agoraRef.current;
      if (engine) {
        engine.leaveChannel();
        engine.release();
        agoraRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!joined) return;
    const id = setInterval(() => setCallDuration((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [joined]);

  // ─── helpers ─────────────────────────────────────────────────────────────────
  const formatDuration = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60)
      .toString()
      .padStart(2, "0")}`;

  const statusText = joined
    ? remoteUid
      ? "Connected"
      : "Waiting for participant..."
    : "Connecting...";
  const timerText = remoteUid ? formatDuration(callDuration) : "00:00";

  // ─── render ──────────────────────────────────────────────────────────────────
  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* ── Background blurred avatar (audio or video-off) ── */}
      {(callType !== "video" || isVideoMuted) && (
        <Image
          source={dummyImages.profileImage}
          blurRadius={18}
          style={styles.bgBlurredImage}
        />
      )}

      <View style={styles.callHeaderOverlay}>
        <View style={styles.callHeaderStatusRow}>
          <CustomText
            text={statusText}
            size={13}
            weight="semibold"
            color={colors.white}
          />
          {!joined && <PulseDot />}
        </View>
        <CustomText
          text={timerText}
          size={13}
          weight="semibold"
          color={colors.white}
          style={styles.callHeaderTimerText}
        />
      </View>

      {/* ══════════════════ VIDEO CALL LAYOUT ══════════════════ */}
      {callType === "video" ? (
        <View style={styles.videoLayoutShell}>

          {/* Remote video / waiting state */}
          {remoteUid ? (
            isRemoteVideoEnabled ? (
              <RtcSurfaceView
                style={styles.remoteVideo}
                zOrderMediaOverlay={false}
                canvas={{ uid: remoteUid }}
              />
            ) : (
              <View style={styles.remoteVideoOffContainer}>
                <Image source={dummyImages.profileImage} style={styles.audioCallAvatar} />
                <CustomText
                  text="Camera turned off"
                  size={16}
                  weight="semibold"
                  color={colors.white}
                  style={styles.remoteCameraOffText}
                />
              </View>
            )
          ) : (
            <View style={styles.waitingContainer}>
              <Image source={dummyImages.profileImage} style={styles.audioCallAvatar} />
            </View>
          )}

          {/* Local video pip — FIX 1: only mount RtcSurfaceView when enabled */}
          <View style={styles.localVideo}>
            {localVideoEnabled ? (
              <RtcSurfaceView
                style={styles.localRtcSurface}
                zOrderMediaOverlay
                canvas={{ uid: 0, sourceType: VideoSourceType.VideoSourceCamera }}
              />
            ) : (
              /* FIX 1: show avatar placeholder, NOT a frozen frame */
              <View style={styles.videoOffPlaceholder}>
                <Image source={dummyImages.profileImage} style={styles.videoOffAvatarSmall} />
                <CustomText text="Camera off" size={10} color={colors.white} style={styles.cameraOffLabel} />
              </View>
            )}
          </View>

          {/* Network quality badge */}
          {joined && (
            <View style={styles.networkBadge}>
              <View style={[styles.networkDot, { backgroundColor: qualityColor(networkQuality) }]} />
              <CustomText
                text={networkQuality <= 2 ? "Good" : networkQuality <= 4 ? "Fair" : "Poor"}
                size={11}
                color={colors.white}
              />
            </View>
          )}
        </View>

      ) : (
        /* ══════════════════ AUDIO CALL LAYOUT ══════════════════ */
        <View style={styles.audioContainer}>
          <Image
            source={dummyImages.profileImage}
            style={styles.audioCallAvatar}
          />
          <CustomText
            text="Audio Call"
            size={24}
            weight="bold"
            color={colors.white}
            style={styles.subtitle}
          />
          <View style={styles.networkBadge}>
            <View style={[styles.networkDot, { backgroundColor: qualityColor(networkQuality) }]} />
            <CustomText
              text={networkQuality <= 2 ? "Good" : networkQuality <= 4 ? "Fair" : "Poor"}
              size={11}
              color={colors.white}
            />
          </View>
        </View>
      )}

      {/* ══════════════ CONTROLS BAR ══════════════ */}
      <View
        style={[
          styles.controlsRow,
          styles.controlsRowOverlay,
          callType === "video" ? styles.controlsRowGapVideo : styles.controlsRowGapAudio,
        ]}
      >
        {/* Mic */}
        <ControlButton
          active={!isMicMuted}
          activeColor={colors.white}
          inactiveColor="#FF4D4F"
          iconColor={isMicMuted ? colors.white : colors.primary}
          source={icons.muteCall}
          onPress={toggleMute}
          label={isMicMuted ? "Unmute" : "Mute"}
        />

        {/* Speaker */}
        <ControlButton
          active={isSpeakerOn}
          activeColor={colors.primary}
          inactiveColor="#666"
          iconColor={colors.white}
          source={icons.speaker}
          onPress={toggleSpeaker}
          label={isSpeakerOn ? "Speaker" : "Earpiece"}
        />

        {/* Camera toggle */}
        {callType === "video" && (
          <ControlButton
            active={!isVideoMuted}
            activeColor={colors.primary}
            inactiveColor="#FF4D4F"
            iconColor={colors.white}
            source={icons.online}
            onPress={toggleVideo}
            label={isVideoMuted ? "Start cam" : "Stop cam"}
          />
        )}

        {/* Flip camera */}
        {callType === "video" && (
          // <ImageIcons source={icons.cameraSwitch} size={68} onPress={switchCamera} style={{
          //   borderRadius: heightPixel(100),
          // }} />
          <ControlButton
            activeColor={colors.primary}
            inactiveColor={colors.white}
            iconColor={colors.black}
            source={icons.cameraSwitch}
            onPress={switchCamera}
            label="Switch Camera"
          />
        )}

        {/* End call */}
        {/* <ImageIcons source={icons.callEnd} size={50} onPress={leaveCall} /> */}
        <ControlButton
          activeColor={colors.primary}
          inactiveColor="#FF4D4F"
          iconColor={colors.white}
          source={icons.endCall}
          onPress={leaveCall}
          label="End Call"
        />
      </View>
    </View>
  );
};

// ─── reusable control button with label ──────────────────────────────────────
const ControlButton = ({
  active, activeColor, inactiveColor, iconColor, source, onPress, label: _label,
}: CtrlProps) => (
  <View style={styles.controlButtonColumn}>
    <View
      style={[
        styles.controlButtonBox,
        { backgroundColor: active ? activeColor : inactiveColor },
      ]}
    >
      <ImageIcons source={source} size={26} onPress={onPress} color={iconColor} />
    </View>
    {/* <CustomText text={label} size={10} color="rgba(255,255,255,0.7)" /> */}
  </View>
);

export default AgoraCall;