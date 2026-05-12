import dummyImages from "../../../Assets/DummyImages";
import OnBoarding from "../../../Components/OnBoarding";
import { navigate } from "../../../Utils/navigation";

const OnBoarding3 = () => {
    return (
        <OnBoarding
            activeDot={3}
            image={dummyImages.onBoarding3}
            title="Thousands of Online Specialists"
            subtitle="Explore a Vast Array of Online Medical Specialists, Offering an Extensive Range of Expertise Tailored to Your Healthcare Needs."
            children="Get Started"
            onPress={() => navigate('Login')}
        />
    );
};



export default OnBoarding3;