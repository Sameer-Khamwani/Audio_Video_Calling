import dummyImages from "../../../Assets/DummyImages";
import OnBoarding from "../../../Components/OnBoarding";
import { navigate } from "../../../Utils/navigation";

const OnBoarding2 = () => {
    return (
        <OnBoarding
            activeDot={2}
            image={dummyImages.onBoarding2}
            title="Connect with Specialists"
            subtitle="Find the right doctor for your health needs with our expert directory. Get personalized recommendations and book appointments with ease."
            children="Next"
            onPress={() => navigate('OnBoarding3')}
            onPressSkip={() => navigate('Login')}
        />
    );
};



export default OnBoarding2;
