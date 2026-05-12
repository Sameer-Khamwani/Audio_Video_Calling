import { useMemo, useState } from "react";
import { FlatList, Pressable, TouchableOpacity, View } from "react-native";
import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import Row from "../../../Components/Row";
import { icons } from "../../../Assets/Icons";
import colors from "../../../Utils/theme";
import styles from "./styles";
import {
    NotificationTab,
    NotificationItem,
    SectionHeaderRow,
    NotificationRow,
    NotificationListRow,
} from "../../../Utils/interface";
import {
    notifications,
    notificationSectionOrder as sectionOrder,
    notificationSectionTitles as sectionTitle,
    notificationCategoryConfig as categoryConfig,
} from "../../../Utils/data";
import ModalComponent from "../../../Components/Modal";
import Button from "../../../Components/Button";
import useToggle from "../../../Hooks/useToggle";

const NotificationCard = ({ item, onPress }: { item: NotificationItem, onPress: () => void }) => {
    const cfg = categoryConfig[item.category];

    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, item.unread ? styles.unreadCard : styles.readCard]}>
            <Row gap={14} alignItems="flex-start">
                <ImageIcons source={icons.bellIcon} size={48} disabled />
                {item.unread ? <View style={styles.unreadDot} /> : null}
                <View style={styles.cardBody}>
                    <Row justifyContent="space-between" alignItems="center" style={styles.titleRow}>
                        <CustomText text={item.title} lines={1} weight="semibold" style={styles.titleText} />
                        <CustomText text={item.timeLabel} size={12} color={colors.gray} />
                    </Row>
                    <CustomText
                        text={item.description}
                        size={12}
                        color={item.unread ? colors.black : colors.lightGray}
                        style={styles.description}
                    />
                </View>
            </Row>
        </TouchableOpacity>
    );
};

const NotificationList = () => {
    const [activeTab, setActiveTab] = useState<NotificationTab>("all");
    const [openNotification, setOpenNotification, toggleOpenNotification, data] = useToggle()

    const unreadCount = useMemo(
        () => notifications.filter(item => item.unread).length,
        [],
    );

    const visibleNotifications = useMemo(() => {
        if (activeTab === "unread") return notifications.filter(item => item.unread);
        return notifications;
    }, [activeTab]);

    const rows = useMemo<NotificationListRow[]>(() => {
        const result: NotificationListRow[] = [];

        sectionOrder.forEach(section => {
            const data = visibleNotifications.filter(item => item.section === section);
            if (!data.length) return;

            if (sectionTitle[section]) {
                result.push({
                    id: `header-${section}`,
                    type: "sectionHeader",
                    title: sectionTitle[section] as string,
                });
            }

            data.forEach(item => {
                result.push({
                    id: item.id,
                    type: "notification",
                    item,
                });
            });
        });

        return result;
    }, [visibleNotifications]);

    return (
        <AppWrapper paddingHorizontal={0} style={styles.wrapper}>
            <View style={styles.segmentedContainer}>
                <TouchableOpacity
                    style={[styles.segmentButton, activeTab === "all" && styles.segmentButtonActive]}
                    onPress={() => setActiveTab("all")}
                >
                    <CustomText
                        text="All Notifications"
                        weight={activeTab === "all" ? "semibold" : "regular"}
                        color={activeTab === "all" ? colors.black : "#7E8795"}
                        size={15}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.segmentButton, activeTab === "unread" && styles.segmentButtonActive]}
                    onPress={() => setActiveTab("unread")}
                >
                    <Row gap={8} alignItems="center">
                        <CustomText
                            text="Unread"
                            weight={activeTab === "unread" ? "semibold" : "regular"}
                            color={activeTab === "unread" ? colors.black : "#7E8795"}
                            size={15}
                        />
                        <View style={styles.unreadTabBadge}>
                            <CustomText text={String(unreadCount)} size={11} weight="bold" color={colors.white} />
                        </View>
                    </Row>
                </TouchableOpacity>
            </View>

            <FlatList
                data={rows}
                keyExtractor={(row) => row.id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    if (item.type === "sectionHeader") {
                        return (
                            <CustomText
                                text={item.title}
                                style={styles.sectionHeader}
                                color="#8E97A6"
                                weight="bold"
                            />
                        );
                    }

                    return <NotificationCard onPress={() => toggleOpenNotification(item?.item)} item={item.item} />;
                }}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <CustomText text="No notifications available." color="#8E97A6" />
                    </View>
                }
            />
            <ModalComponent
                open={openNotification}
                close={() => toggleOpenNotification()}
            >
                <CustomText text={data?.title} size={18} weight="bold" style={styles.modalNotificationTitle} />
                <CustomText style={styles.modalNotificationDescription} text={data?.description} size={14} color={colors.gray} weight="semibold" />
                <Button
                    children="Ok"
                    onPress={() => toggleOpenNotification()}
                    style={styles.modalNotificationOkButton}
                />

            </ModalComponent>
        </AppWrapper>
    );
};

export default NotificationList;
