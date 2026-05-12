import { useMemo, useState } from "react";
import { FlatList, Pressable, TouchableOpacity, View } from "react-native";
import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import Row from "../../../Components/Row";
import colors from "../../../Utils/theme";
import styles from "./styles";
import dummyImages from "../../../Assets/DummyImages";
import { navigate } from "../../../Utils/navigation";
import { ChatTab, ChatItem } from "../../../Utils/interface";
import { chats } from "../../../Utils/data";

const ChatList = () => {
    const [activeTab, setActiveTab] = useState<ChatTab>("Recent");

    const filteredChats = useMemo(() => {
        if (activeTab === "Unread") {
            return chats.filter(item => item.unreadCount > 0);
        }
        return chats;
    }, [activeTab]);

    return (
        <AppWrapper paddingHorizontal={0}>
            <View style={styles.segmentedContainer}>
                {(["Unread", "Recent"] as ChatTab[]).map(tab => {
                    const active = activeTab === tab;
                    return (
                        <Pressable
                            key={tab}
                            style={[styles.segmentButton, active && styles.segmentButtonActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <CustomText
                                text={tab}
                                size={16}
                                weight={"semibold"}
                                color={active ? colors.white : colors.black}
                            />
                        </Pressable>
                    );
                })}
            </View>

            <FlatList
                data={filteredChats}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                renderItem={({ item }) => {
                    const isUnread = item.unreadCount > 0;
                    return (
                        <TouchableOpacity activeOpacity={0.8} style={[styles.card, isUnread ? styles.unreadCard : styles.readCard]} onPress={() => navigate('ViewChat', { chat: item })}>
                            <Row gap={12} alignItems="center" style={styles.cardRow}>
                                <Row gap={10}>
                                    <ImageIcons source={dummyImages.patient} size={50} style={styles.chatAvatar} />
                                    <View style={styles.messageSection}>
                                        <CustomText text={item.doctorName} size={13} weight={isUnread ? "bold" : "semibold"} />
                                        <CustomText
                                            text={item.preview}
                                            size={13}
                                            color={isUnread ? colors.primary : colors.gray}
                                            weight={item.isVoiceMessage && isUnread ? "semibold" : "regular"}
                                            lines={1}
                                            style={styles.previewText}
                                        />
                                    </View>
                                </Row>


                                <View style={styles.rightSection}>
                                    <Row gap={4} alignItems="center">
                                        <CustomText text={item.time} size={12} color={colors.gray} />
                                    </Row>
                                    {isUnread ? (
                                        <View style={styles.unreadBadge}>
                                            <CustomText text={String(item.unreadCount)} size={10} color={colors.white} weight="bold" />
                                        </View>
                                    ) : null}
                                </View>
                            </Row>
                        </TouchableOpacity>
                    );
                }}
            />
        </AppWrapper>
    );
};

export default ChatList;
