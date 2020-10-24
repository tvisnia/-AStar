import {
  TransitionSpecs,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';

export const transitionConfig = ({route, navigation}) => ({
  headerStatusBarHeight:
    navigation.dangerouslyGetState().routes.indexOf(route) >= 0 ? 0 : undefined,
  ...TransitionPresets.SlideFromRightIOS,
  cardOverlayEnabled: true,
  cardShadowEnabled: true,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
});
