import React from 'react';
import { COLORS, FONTS } from '../constants';

interface HeadlineProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size?: number;
  weight?: number;
  color?: string;
  align?: React.CSSProperties['textAlign'];
  letterSpacing?: number;
}

export const Headline: React.FC<HeadlineProps> = ({
  children,
  style,
  size = 96,
  weight = 900,
  color = COLORS.text,
  align = 'center',
  letterSpacing = -2,
}) => (
  <span
    style={{
      fontFamily: FONTS.sans,
      fontSize: size,
      fontWeight: weight,
      color,
      textAlign: align,
      letterSpacing,
      lineHeight: 1.1,
      display: 'block',
      ...style,
    }}
  >
    {children}
  </span>
);

interface SubtextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
  align?: React.CSSProperties['textAlign'];
}

export const Subtext: React.FC<SubtextProps> = ({
  children,
  style,
  size = 42,
  color = COLORS.grayLight,
  align = 'center',
}) => (
  <span
    style={{
      fontFamily: FONTS.sans,
      fontSize: size,
      fontWeight: 400,
      color,
      textAlign: align,
      letterSpacing: 0,
      lineHeight: 1.4,
      display: 'block',
      ...style,
    }}
  >
    {children}
  </span>
);

interface LabelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  style,
  size = 36,
  color = COLORS.text,
}) => (
  <span
    style={{
      fontFamily: FONTS.sans,
      fontSize: size,
      fontWeight: 700,
      color,
      letterSpacing: 4,
      textTransform: 'uppercase',
      display: 'block',
      ...style,
    }}
  >
    {children}
  </span>
);
