import type { DesignTokens } from '@/types/design-tokens'

export interface DesignPreset {
  id: string
  name: string
  description: string
  icon: string
  category: 'professional' | 'modern' | 'minimal'
  tokens: DesignTokens
}

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    id: 'material-design',
    name: 'Material Design',
    description: 'Google\'s Material Design 3 system with dynamic color and elevation',
    icon: '🎨',
    category: 'professional',
    tokens: {
      name: 'Material Design',
      colors: {
        primary: {
          hex: '#6750A4',
          usage: 'Primary actions, key components',
        },
        secondary: {
          hex: '#625B71',
          usage: 'Secondary actions, less prominent elements',
        },
        neutral: {
          '50': '#FAFAFA',
          '100': '#F5F5F5',
          '200': '#EEEEEE',
          '300': '#E0E0E0',
          '400': '#BDBDBD',
          '500': '#9E9E9E',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
        },
        semantic: {
          error: {
            hex: '#B3261E',
            usage: 'Error states, destructive actions',
          },
          success: {
            hex: '#2E7D32',
            usage: 'Success states, confirmations',
          },
          warning: {
            hex: '#F57C00',
            usage: 'Warning states, cautions',
          },
        },
      },
      typography: {
        baseFont: 'Roboto, system-ui, -apple-system, sans-serif',
        scale: {
          xs: 11,
          sm: 12,
          md: 14,
          lg: 16,
          xl: 22,
          '2xl': 28,
          '3xl': 36,
          '4xl': 45,
          '5xl': 57,
        },
        weights: {
          regular: 400,
          medium: 500,
          bold: 700,
        },
        lineHeights: {
          tight: 1.2,
          normal: 1.5,
          relaxed: 1.75,
        },
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        '2xl': 48,
        '3xl': 64,
      },
      radii: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 28,
        full: 9999,
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      componentVariants: {
        button: [
          {
            name: 'filled',
            background: '#6750A4',
            textColor: '#FFFFFF',
            padding: 'md',
          },
          {
            name: 'outlined',
            background: 'transparent',
            textColor: '#6750A4',
            padding: 'md',
            border: '1px solid #6750A4',
          },
          {
            name: 'text',
            background: 'transparent',
            textColor: '#6750A4',
            padding: 'sm',
          },
        ],
        input: [
          {
            name: 'filled',
            background: '#E7E0EC',
            textColor: '#1C1B1F',
            padding: 'md',
          },
          {
            name: 'outlined',
            background: 'transparent',
            textColor: '#1C1B1F',
            padding: 'md',
            border: '1px solid #79747E',
          },
        ],
      },
    },
  },
  {
    id: 'apple-hig',
    name: 'Apple Human Interface',
    description: 'Apple\'s design language with SF Pro typography and vibrant colors',
    icon: '',
    category: 'professional',
    tokens: {
      name: 'Apple Human Interface',
      colors: {
        primary: {
          hex: '#007AFF',
          usage: 'System blue for primary actions',
        },
        secondary: {
          hex: '#5856D6',
          usage: 'System indigo for secondary actions',
        },
        neutral: {
          '50': '#F2F2F7',
          '100': '#E5E5EA',
          '200': '#D1D1D6',
          '300': '#C7C7CC',
          '400': '#AEAEB2',
          '500': '#8E8E93',
          '600': '#636366',
          '700': '#48484A',
          '800': '#3A3A3C',
          '900': '#1C1C1E',
        },
        semantic: {
          success: {
            hex: '#34C759',
            usage: 'System green for success states',
          },
          error: {
            hex: '#FF3B30',
            usage: 'System red for errors',
          },
          warning: {
            hex: '#FF9500',
            usage: 'System orange for warnings',
          },
        },
      },
      typography: {
        baseFont: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
        scale: {
          xs: 11,
          sm: 13,
          md: 15,
          lg: 17,
          xl: 22,
          '2xl': 28,
          '3xl': 34,
          '4xl': 41,
          '5xl': 48,
        },
        weights: {
          regular: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeights: {
          tight: 1.2,
          normal: 1.4,
          relaxed: 1.6,
        },
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        '2xl': 44,
        '3xl': 64,
      },
      radii: {
        xs: 4,
        sm: 8,
        md: 10,
        lg: 14,
        xl: 20,
        full: 9999,
      },
      shadows: {
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        md: '0 4px 8px 0 rgba(0, 0, 0, 0.12)',
        lg: '0 8px 16px 0 rgba(0, 0, 0, 0.16)',
        xl: '0 16px 32px 0 rgba(0, 0, 0, 0.20)',
      },
      componentVariants: {
        button: [
          {
            name: 'filled',
            background: '#007AFF',
            textColor: '#FFFFFF',
            padding: 'md',
          },
          {
            name: 'tinted',
            background: 'rgba(0, 122, 255, 0.15)',
            textColor: '#007AFF',
            padding: 'md',
          },
          {
            name: 'plain',
            background: 'transparent',
            textColor: '#007AFF',
            padding: 'sm',
          },
        ],
        input: [
          {
            name: 'default',
            background: 'rgba(120, 120, 128, 0.12)',
            textColor: '#000000',
            padding: 'md',
          },
        ],
      },
    },
  },
  {
    id: 'fluent-design',
    name: 'Microsoft Fluent',
    description: 'Microsoft\'s Fluent Design System with acrylic and depth',
    icon: '🪟',
    category: 'professional',
    tokens: {
      name: 'Microsoft Fluent',
      colors: {
        primary: {
          hex: '#0078D4',
          usage: 'Primary brand color for key actions',
        },
        secondary: {
          hex: '#8764B8',
          usage: 'Secondary actions and accents',
        },
        neutral: {
          '50': '#FAF9F8',
          '100': '#F3F2F1',
          '200': '#EDEBE9',
          '300': '#E1DFDD',
          '400': '#D2D0CE',
          '500': '#C8C6C4',
          '600': '#A19F9D',
          '700': '#605E5C',
          '800': '#323130',
          '900': '#201F1E',
        },
        semantic: {
          error: {
            hex: '#D13438',
            usage: 'Error states and critical actions',
          },
          success: {
            hex: '#107C10',
            usage: 'Success states and confirmations',
          },
          warning: {
            hex: '#FFB900',
            usage: 'Warning states and alerts',
          },
        },
      },
      typography: {
        baseFont: '"Segoe UI", system-ui, -apple-system, sans-serif',
        scale: {
          xs: 10,
          sm: 12,
          md: 14,
          lg: 16,
          xl: 20,
          '2xl': 24,
          '3xl': 28,
          '4xl': 32,
          '5xl': 42,
        },
        weights: {
          regular: 400,
          semibold: 600,
          bold: 700,
        },
        lineHeights: {
          tight: 1.25,
          normal: 1.5,
          relaxed: 1.75,
        },
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        '2xl': 32,
        '3xl': 48,
      },
      radii: {
        xs: 2,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        full: 9999,
      },
      shadows: {
        sm: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132)',
        md: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132)',
        lg: '0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132)',
        xl: '0 12.8px 28.8px 0 rgba(0, 0, 0, 0.132)',
      },
      componentVariants: {
        button: [
          {
            name: 'primary',
            background: '#0078D4',
            textColor: '#FFFFFF',
            padding: 'md',
          },
          {
            name: 'standard',
            background: '#FFFFFF',
            textColor: '#201F1E',
            padding: 'md',
            border: '1px solid #8A8886',
          },
          {
            name: 'subtle',
            background: 'transparent',
            textColor: '#201F1E',
            padding: 'md',
          },
        ],
        input: [
          {
            name: 'default',
            background: '#FFFFFF',
            textColor: '#201F1E',
            padding: 'md',
            border: '1px solid #8A8886',
          },
        ],
      },
    },
  },
]

export function getPresetById(id: string): DesignPreset | undefined {
  return DESIGN_PRESETS.find(preset => preset.id === id)
}

export function getPresetsByCategory(category: DesignPreset['category']): DesignPreset[] {
  return DESIGN_PRESETS.filter(preset => preset.category === category)
}
