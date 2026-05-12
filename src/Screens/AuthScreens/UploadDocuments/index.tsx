import { ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import AppWrapper from "../../../Components/AppWrapper";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import CustomText from "../../../Components/CustomText";
import Row from "../../../Components/Row";
import colors from "../../../Utils/theme";
import Icons from "../../../Components/ImageIcons/Icons";
import icons from "../../../Assets/Icons";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import Button from "../../../Components/Button";
import { styles } from './styles';

const UploadDocuments = () => {

    const Documents = [{
        title: "Medical License",
        description: "Official PMDC or relevant health authority registration certificate.",
        required: true,
        icon: icons.greaterThan,
    },
    {
        title: "CNIC / National ID",
        description: "Front and back side of your valid government-issued identification card.",
        required: true,
        icon: icons.greaterThan,
    },
    {
        title: "Degree Certificate",
        description: "Your MBBS or specialization degree awarded by the university.",
        required: true,
        icon: icons.greaterThan,
    },

    ]

    return (
        <AppWrapper paddingHorizontal={0} style={styles.appWrapperStyle}>
            <ScrollView
                style={styles.scrollViewStyle}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <Row gap={widthPixel(12)} style={styles.stepRow}>
                    <CustomText text="Step 3 of 3" />
                    <View style={styles.progressBarBackground} >
                        <View style={styles.progressBarFilled} />
                    </View>
                </Row>

                <CustomText text="Final Verification" size={24} weight="bold" />
                <CustomText
                    text="Please provide high-quality scans or photos of your professional credentials to complete your profile verification."
                    size={16}
                />

                <View style={styles.infoBoxContainer}>

                    <CustomText size={12} text="All documents are stored in encrypted vaults. We only use this information for professional credentialing and identity verification." />
                </View>
                {
                    Documents.map((item, index) => (
                        <TouchableOpacity activeOpacity={0.8}>

                            <View style={styles.documentCardContainer}>
                                <Row justifyContent="space-between">
                                    <CustomText text={item.title} weight="semibold" />
                                    <Row style={styles.requiredBadgeRow}>
                                        <ImageIcons source={icons.drawerIcons.aboutUs} size={14} />
                                        <CustomText text="Required" weight="semibold" size={12} />
                                    </Row>
                                </Row>
                                <Row style={styles.descriptionRow} justifyContent="space-between">
                                    <CustomText style={styles.descriptionTextStyle} size={12} text={item.description} />
                                    <ImageIcons source={icons.greaterThan} size={14} color={colors.lightGray} />
                                </Row>
                                <Row style={styles.uploadIndicatorRow} alignItems="center">
                                    <ImageIcons source={icons.drawerIcons.aboutUs} size={14} color={colors.primary} />
                                    <CustomText text="Tap to upload file" size={12} weight="semibold" color={colors.primary} />
                                </Row>
                            </View>
                        </TouchableOpacity>
                    ))

                }
                <Button size={16} children="Submit for Verification" style={styles.submitButtonStyle} onPress={() => { }} />
                <Button size={16} buttonType="secondary" children="Back to Previous Step" style={styles.backButtonStyle} onPress={() => { }} />

            </ScrollView>
        </AppWrapper>
    )
}

export default UploadDocuments; 