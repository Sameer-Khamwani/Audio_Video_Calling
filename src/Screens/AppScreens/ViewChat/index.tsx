import * as RNDocumentsPicker from '@react-native-documents/picker';
import * as RNDocumentsViewer from '@react-native-documents/viewer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import dummyImages from '../../../Assets/DummyImages';
import { icons } from '../../../Assets/Icons';
import CustomText from '../../../Components/CustomText';
import CustomTextInput from '../../../Components/CustomTextInput';
import { default as Icons, default as ImageIcons } from '../../../Components/ImageIcons/Icons';
import Row from '../../../Components/Row';
import SizeBox from '../../../Components/SizeBox';
import { AGORA_CHANNEL_PREFIX } from '../../../Config/agora';
import { DUMMY_CHAT_ITEM as DUMMY_ITEM, DUMMY_USER, SEED_MESSAGES } from '../../../Utils/data';
import { heightPixel, widthPixel } from '../../../Utils/helper';
import { Attachment, IMessage, IViewChat } from '../../../Utils/interface';
import { goBack } from '../../../Utils/navigation';
import { colors } from '../../../Utils/theme';
import { styles } from './styles';

// ─── Component ────────────────────────────────────────────────────────────────

const ViewChat: FC<IViewChat> = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<IMessage>>(null);

  const [messages, setMessages] = useState<IMessage[]>(SEED_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [sending, setSending] = useState(false);

  // ── Status bar ──────────────────────────────────────────────────────────────
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') StatusBar.setBackgroundColor(colors.white);
      return () => {
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS === 'android')
          StatusBar.setBackgroundColor(colors.white);
      };
    }, []),
  );

  // ── Header ──────────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const openCall = (callType: 'audio' | 'video') => {
      const safeName = DUMMY_ITEM.name?.replace(/\s+/g, '-').toLowerCase() ?? 'chat';
      (navigation as any).navigate('AgoraCall', {
        callType,
        channelName: `${AGORA_CHANNEL_PREFIX}-${safeName}`,
      });
    };

    navigation.setOptions({
      headerStyle: {
        elevation: 8,
        bordercolor: colors.white,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: heightPixel(90),
      },
      headerTitle: () => (
        <Row style={styles.headerRow}>
          <Image
            source={
              DUMMY_ITEM.image
                ? { uri: DUMMY_ITEM.image }
                : dummyImages.profileImage
            }
            style={styles.headerAvatar}
          />
          <CustomText
            style={styles.headerName}
            text={DUMMY_ITEM.name}
            lines={1}
            weight="semibold"
          />
        </Row>
      ),
      headerLeft: () => (
        <ImageIcons
          hitSlop={widthPixel(20)}
          onPress={() => goBack()}
          source={icons.back}
          size={18}
          style={styles.headerBackIconPadding}
        />
      ),
      headerRight: () => (
        <Row style={styles.headerActions}>
          {/* <TouchableOpacity onPress={() => openCall('audio')}>
            <CustomText text="Audio" size={14} weight="semibold" color={colors.primary} />
          </TouchableOpacity> */}
          <ImageIcons source={icons.phone} size={24} onPress={() => openCall('audio')} color={colors.primary} />
          <ImageIcons source={icons.online} size={24} onPress={() => openCall('video')} color={colors.primary} />
          {/* <TouchableOpacity onPress={() => openCall('video')}>
            <CustomText text="Video" size={14} weight="semibold" color={colors.primary} />
          </TouchableOpacity> */}
        </Row>
      ),
    });
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const isMe = (msg: IMessage) => msg.user._id === DUMMY_USER._id;

  const appendMessage = (msg: IMessage) =>
    setMessages(prev => [...prev, msg]);

  const scrollToBottom = () =>
    flatListRef.current?.scrollToEnd({ animated: true });

  // ── Send ────────────────────────────────────────────────────────────────────

  const handleSend = useCallback(() => {
    const text = inputText.trim();
    if (!text && attachments.length === 0) return;
    if (sending) return;

    setSending(true);

    const firstImage = attachments.find(a => a.kind === 'image');
    const firstDoc = attachments.find(a => a.kind === 'document');

    const msg: IMessage = {
      _id: `m-${Date.now()}`,
      text: text || (firstDoc ? `Attachment: ${firstDoc.name}` : ''),
      createdAt: new Date(),
      user: { _id: DUMMY_USER._id, name: DUMMY_USER.first_name },
      image: firstImage?.uri,
      document: firstDoc?.uri,
      documentName: firstDoc?.name,
    };

    appendMessage(msg);
    setInputText('');
    setAttachments([]);
    setSending(false);

    setTimeout(scrollToBottom, 50);
  }, [inputText, attachments, sending]);

  // ── Attachment picker ───────────────────────────────────────────────────────

  const openAttachmentPicker = async () => {
    try {
      const picked = await (RNDocumentsPicker as any).pick({
        allowMultiSelection: true,
        type: ['*/*'],
      });
      if (!picked?.length) return;
      const next: Attachment[] = picked
        .filter((f: any) => Boolean(f.uri))
        .map((f: any) => ({
          uri: f.uri,
          type: f.type,
          name: f.name ?? `file-${Date.now()}`,
          kind: f.type?.startsWith('image/') ? 'image' : 'document',
        }));
      setAttachments(prev => [...prev, ...next]);
    } catch (err) {
      if (!(RNDocumentsPicker as any).isCancel?.(err)) {
        console.log('Picker error:', err);
      }
    }
  };

  const openDocument = async (uri: string) => {
    try {
      const v: any = RNDocumentsViewer;
      if (v?.viewDocument) return v.viewDocument({ uri });
      if (v?.openDocument) return v.openDocument({ uri });
      if (v?.open) return v.open({ uri });
    } catch (err) {
      console.log('Viewer error:', err);
    }
  };

  const removeAttachment = (index: number) =>
    setAttachments(prev => prev.filter((_, i) => i !== index));

  // ── Render message ──────────────────────────────────────────────────────────

  const renderMessage = ({ item, index }: { item: IMessage; index: number }) => {
    const mine = isMe(item);
    const next = messages[index + 1];
    const sameNextUser = next?.user._id === item.user._id;

    return (
      <View style={styles.msgPadding}>
        {!sameNextUser && <SizeBox heightSize={1} />}

        <Row
          alignItems="flex-start"
          justifyContent={mine ? 'flex-end' : 'flex-start'}
          style={styles.msgRow}
        >
          <View
            style={[styles.msgColumnBase, { alignItems: mine ? 'flex-end' : 'flex-start' }]}
          >
            {/* Text bubble */}
            {!!item.text && (
              <View style={mine ? styles.bubbleMe : styles.bubbleThem}>
                <Row style={styles.msgBubbleRow}>
                  <CustomText
                    text={item.text}
                    size={13}
                    style={
                      item.text.includes('Attachment:')
                        ? styles.msgTextAttachmentWidth
                        : undefined
                    }
                    color={mine ? colors.white : colors.black}
                  />
                  {item.text.includes('Attachment:') && (
                    <Icons
                      source={icons.document}
                      size={40}
                      color={mine ? colors.white : colors.black}
                    />
                  )}
                </Row>
                {/* Timestamp inside bubble */}
                <CustomText
                  size={10}
                  text={dayjs(item.createdAt).format('hh:mm A')}
                  color={mine ? colors.white : colors.black}
                  style={styles.bubbleTime}
                />
              </View>
            )}

            {/* Image */}
            {!!item.image && (
              <Image
                source={{ uri: item.image }}
                style={[
                  styles.msgImage,
                  { alignSelf: mine ? 'flex-end' : 'flex-start' },
                ]}
              />
            )}

            {/* Document attachment */}
            {!item.image && !!item.document && !item.text && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => openDocument(item.document!)}
                style={mine ? styles.docBubbleMe : styles.docBubbleThem}
              >
                <Icons
                  source={icons.document}
                  size={20}
                  color={mine ? colors.white : colors.primary}
                />
                <CustomText
                  text={item.documentName ?? 'Document'}
                  size={11}
                  lines={1}
                  color={mine ? colors.white : colors.black}
                  style={styles.docNameText}
                />
                <CustomText
                  size={10}
                  text={dayjs(item.createdAt).format('hh:mm A')}
                  color={mine ? colors.white : colors.black}
                  style={styles.docTimestampText}
                />
              </TouchableOpacity>
            )}
          </View>
        </Row>
      </View>
    );
  };

  // ── Attachment strip ─────────────────────────────────────────────────────────

  const renderAttachStrip = () => {
    if (attachments.length === 0) return null;
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.attachStrip}
        contentContainerStyle={styles.attachStripContent}
      >
        {attachments.map((a, i) => (
          <View key={i} style={styles.attachThumbContainer}>
            {/* Remove button */}
            <Icons
              onPress={() => removeAttachment(i)}
              hitSlop={widthPixel(20)}
              style={styles.removeBtn}
              source={icons.cardCross}
              size={22}
            // color={colors.red}
            />
            {a.kind === 'image' ? (
              <Image
                source={{ uri: a.uri }}
                style={styles.attachThumb}
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => openDocument(a.uri)}
                style={styles.attachDoc}
              >
                <Icons source={icons.document} size={18} color={colors.primary} />
                <CustomText
                  text={a.name}
                  size={11}
                  lines={1}
                  style={styles.attachDocName}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  // ── Input bar ────────────────────────────────────────────────────────────────

  const renderInputBar = () => (
    <View
      style={[
        styles.inputBar,
        // { paddingBottom: Math.max(insets.bottom, heightPixel(8)) },
      ]}
    >
      {renderAttachStrip()}
      <Row style={styles.inputBarRow}>
        {/* Add attachment */}
        <Icons
          source={icons.addIcon}
          size={35}
          onPress={openAttachmentPicker}
        />

        {/* Text input */}
        {/* <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message…"
          placeholderTextColor={colors.placeholder ?? '#aaa'}
          multiline
          style={styles.textInput}
          returnKeyType="default"
          blurOnSubmit={false}
        /> */}
        <CustomTextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message…"
          multiline
          containerStyle={styles.chatInputContainer}
        />

        {/* Send */}
        <Icons
          source={icons.send}
          size={40}
          onPress={handleSend}
        />
      </Row>
    </View>
  );

  // ── Main render ──────────────────────────────────────────────────────────────

  return (
    <View style={styles.listContainer}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => String(item._id)}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContentPadding}
        onContentSizeChange={scrollToBottom}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      />
      {renderInputBar()}
    </View>
  );
};

export default ViewChat;