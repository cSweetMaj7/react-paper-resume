
import React, { useState } from "react";
import { ITheme, themes, getThemeByName } from "./Assets/Themes";
import { animated, useSpring, SpringConfig } from "react-spring";

const defaultConfigName = "Default";
const deaultConfig = getThemeByName(defaultConfigName);
export const [transitionAnimState, setTransitionAnimState] = useState(null);
export const [currentAnimState, setCurrentAnimState] = useState(deaultConfig);
export const [currentConfigIndex, setCurrentConfigIndex] = useState(0);
export const [paperRotationDegrees, setPaperRotationDegrees] = useState(0);
export const [gradientStateA, setGradientStateA] = useState(`linear-gradient(0deg, ${deaultConfig.sidebarTopColor} 0%, ${deaultConfig.sidebarBottomColor} 100%)`);
export const [gradientStateB, setGradientStateB] = useState(`linear-gradient(0deg, ${deaultConfig.sidebarBottomColor} 0%, ${deaultConfig.sidebarTopColor} 100%)`);
export const [isTransitioning, setIsTransitioning] = useState(false);
export const [isHidingThemeName, setIsHidingThemeName] = useState(false);
export const [currentScale, setCurrentScale] = useState(1);
export const [currentPaperRotationStyle, setCurrentPaperRotationStyle] = useState(`perspective(2000px) rotateY(0deg) scale(${currentScale})`);
export const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
export const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
export const [scaledHorizontalOffset, setScaledHorizontalOffset] = useState(0);
export const [scaledVerticalOffset, setScaledVerticalOffset] = useState(0);
export const [validatedRender, setValidatedRender] = useState(false);
export const [isLoaded, setIsLoaded] = useState(false);

export class AnimationController {
  colorTransitionConfig: SpringConfig = {
    duration: 3000
  };
  paperTransitionConfig: SpringConfig = {
    friction: 100,
  };
  gradientTransitionConfig: SpringConfig = {
    duration: 3000
  };

  public SpinPaperAnimation() {
    const toPaperRotationStyle = `perspective(2000px) rotateY(${paperRotationDegrees}deg) scale(${currentScale})`;
    return useSpring({
      from: {
        transform: currentPaperRotationStyle
      },
      to: {
        transform: toPaperRotationStyle
      },
      config: this.paperTransitionConfig,
      onRest: () => {
        setCurrentPaperRotationStyle(toPaperRotationStyle);
        setIsTransitioning(false);
      }
    });
  };

  public advanceRotation = (left?: boolean) => {
    setPaperRotationDegrees(left ? paperRotationDegrees - 360 : paperRotationDegrees + 360);
  }

  // no params for next, (true) for previous
  public transitionTheme(previous?: boolean) {
    setIsTransitioning(true);
    const lastIndex = themes.length - 1;
    let targetIndex = 0;
    if (previous) {
      targetIndex = currentConfigIndex === 0 ? lastIndex : currentConfigIndex - 1;
    } else {
      targetIndex = currentConfigIndex === lastIndex ? 0 : currentConfigIndex + 1;
    }
    const newState = themes[targetIndex];
    setTransitionAnimState(newState);
    setCurrentConfigIndex(targetIndex);
    setCurrentAnimState(newState);
    setGradientStateA(`linear-gradient(0deg, ${newState.sidebarTopColor} 0%, ${newState.sidebarBottomColor} 100%)`);
    setGradientStateB(`linear-gradient(0deg, ${newState.sidebarBottomColor} 0%, ${newState.sidebarTopColor} 100%)`);
    this.advanceRotation(previous);
  }

  public gradientAnimation = useSpring({
    from: {
      background: gradientStateA
    },
    to: {
      background: gradientStateB
    },
    loop: { reverse: true },
    config: this.gradientTransitionConfig
  });

  public viewportBackgroundColorAnimation = useSpring({
    to: {
      backgroundColor: transitionAnimState.viewportBackgroundColor
    },
    config: this.colorTransitionConfig
  });

  public qrFillColorAnimation = useSpring({
    to: {
      color: transitionAnimState.sidebarTextColor,
      fill: transitionAnimState.sidebarTextColor
    },
    config: this.colorTransitionConfig
  });

  public bodyBackgroundColorAnimation = useSpring({
    to: {
      backgroundColor: transitionAnimState.bodyBackgroundColor
    },
    config: this.colorTransitionConfig
  });

  public bodyTextColorAnimation = useSpring({
    to: {
      color: transitionAnimState.bodyTextColor
    },
    config:  this.colorTransitionConfig
  });

  public sidebarTextColorAnimation = useSpring({
    to: {
      color: transitionAnimState.sidebarTextColor
    },
    config: this.colorTransitionConfig
});

}

