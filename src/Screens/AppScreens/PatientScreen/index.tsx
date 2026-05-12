import AppWrapper from "../../../Components/AppWrapper";
import SearchBar from "../../../Components/SearchBar";
import colors from "../../../Utils/theme";
import { FlatList, TouchableOpacity, View } from "react-native";
import { icons } from "../../../Assets/Icons";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import Row from "../../../Components/Row";
import CustomText from "../../../Components/CustomText";
import styles from "./styles";
import dummyImages from "../../../Assets/DummyImages";
import { navigate } from "../../../Utils/navigation";
import { Patient } from "../../../Utils/interface";
import { patients } from "../../../Utils/data";
import ListEmptyComponent from "../../../Components/ListEmptyComponent";

const PatientScreen = () => {
    const renderPatientCard = ({ item }: { item: Patient }) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('PatientDetail')} style={styles.card}>
            <Row>
                <Row justifyContent="space-between" style={styles.cardContent} gap={15}>
                    <Row gap={16}>
                        <ImageIcons source={dummyImages.patient} size={56} style={styles.patientAvatar} />
                        <View>
                            <CustomText text={item.name} size={17} weight="semibold" />
                            <Row gap={6} style={styles.metaRow}>
                                <ImageIcons source={icons.phone} size={16} color={colors.lightGray} />
                                <CustomText text={item.phone} size={12} weight="regular" color={colors.lightGray} />
                            </Row>
                            <Row gap={6}>
                                <ImageIcons source={icons.calendar} size={16} color={colors.lightGray} />
                                <CustomText text={item.appointmentTime} size={12} weight="regular" color={colors.lightGray} />
                            </Row>
                        </View>
                    </Row>
                    <View style={styles.visitBadge}>
                        <CustomText text={`${item.visits}`} size={20} weight="bold" color={colors.primary} />
                        <CustomText text="VISITS" size={10} weight="regular" color={colors.primary} />
                    </View>
                </Row>
            </Row>
        </TouchableOpacity>
    );

    return <AppWrapper paddingHorizontal={0}>

        <FlatList
            data={patients}
            keyExtractor={(item) => item.id}
            renderItem={renderPatientCard}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<ListEmptyComponent text="No patients found" />}
            ListHeaderComponent={<SearchBar rootStyle={styles.searchBar} filter={false} placeholder="Search by name or phone..." />}
        />
    </AppWrapper>;
};

export default PatientScreen;