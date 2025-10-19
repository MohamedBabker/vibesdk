import React, { useState } from 'react';
import { RetroArcadeThemeProvider, RetroArcadeTheme, RetroArcadeThemeSwitcher } from './RetroArcadeTheme';
import { RetroButton } from './RetroButton';
import { RetroInput } from './RetroInput';
import { RetroCard } from './RetroCard';
import { RetroMotion, RetroMotionContainer, RetroMotionItem } from './RetroMotion';
import { RetroAccessibility } from './RetroAccessibility';
import { RetroVirtualScroll, RetroLazyLoad, RetroOptimizedImage } from './RetroPerformance';
import { Play, Pause, Settings, Zap, Star, Heart, Gamepad2, Trophy, Crown } from 'lucide-react';

// === RETRO ARCADE DEMO PAGE ===
// Production-level showcase of the complete design system

const RetroArcadeDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Demo data
  const demoItems = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    title: `Retro Item ${i + 1}`,
    description: `This is a demo item with pixel-perfect styling`,
    icon: i % 3 === 0 ? <Gamepad2 className="w-6 h-6" /> : i % 3 === 1 ? <Trophy className="w-6 h-6" /> : <Crown className="w-6 h-6" />
  }));

  const handleButtonClick = async (variant: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <RetroArcadeThemeProvider>
      <RetroArcadeTheme>
        <div className="min-h-screen bg-retro-bg-primary text-retro-text-primary">
          {/* Header */}
          <RetroMotion animation="slideInDown">
            <header className="border-b-2 border-retro-primary bg-retro-bg-secondary retro-pixel-border">
              <div className="container mx-auto px-retro-6 py-retro-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-retro-4">
                    <div className="retro-pixel-border-lg bg-retro-primary p-retro-2 rounded-retro-base">
                      <Gamepad2 className="w-8 h-8 text-retro-text-inverse" />
                    </div>
                    <div>
                      <h1 className="font-retro-primary text-retro-2xl text-retro-text-primary">
                        RETRO ARCADE
                      </h1>
                      <p className="font-retro-body text-retro-sm text-retro-text-secondary">
                        Design System Demo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-retro-4">
                    <RetroButton
                      variant="outline"
                      size="sm"
                      leftIcon={<Settings className="w-4 h-4" />}
                    >
                      Settings
                    </RetroButton>
                    <RetroButton
                      variant="primary"
                      size="sm"
                      leftIcon={<Zap className="w-4 h-4" />}
                    >
                      Start Game
                    </RetroButton>
                  </div>
                </div>
              </div>
            </header>
          </RetroMotion>

          {/* Main Content */}
          <main className="container mx-auto px-retro-6 py-retro-8">
            <RetroMotionContainer stagger>
              {/* Hero Section */}
              <RetroMotionItem>
                <RetroCard
                  variant="neon"
                  size="lg"
                  className="mb-retro-8"
                  title="Welcome to Retro Arcade"
                  subtitle="Experience the complete design system"
                  description="This is a production-level implementation of the Retro Arcade design system, featuring advanced components, motion choreography, accessibility features, and performance optimizations."
                >
                  <div className="flex flex-wrap gap-retro-4">
                    <RetroButton
                      variant="primary"
                      size="lg"
                      animation="bounce"
                      loading={isLoading}
                      leftIcon={<Play className="w-5 h-5" />}
                      onClick={() => handleButtonClick('primary')}
                    >
                      {isLoading ? 'Loading...' : 'Start Adventure'}
                    </RetroButton>
                    <RetroButton
                      variant="secondary"
                      size="lg"
                      animation="glow"
                      leftIcon={<Star className="w-5 h-5" />}
                    >
                      View Gallery
                    </RetroButton>
                    <RetroButton
                      variant="accent"
                      size="lg"
                      animation="pulse"
                      leftIcon={<Heart className="w-5 h-5" />}
                    >
                      Add to Favorites
                    </RetroButton>
                  </div>
                </RetroCard>
              </RetroMotionItem>

              {/* Form Section */}
              <RetroMotionItem>
                <RetroCard
                  variant="primary"
                  size="md"
                  className="mb-retro-8"
                  title="Interactive Components"
                  subtitle="Try out the form elements"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-retro-6">
                    <RetroInput
                      label="Player Name"
                      placeholder="Enter your name"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      leftIcon={<Gamepad2 className="w-4 h-4" />}
                      helperText="Choose a cool retro name"
                    />
                    <RetroInput
                      label="High Score"
                      placeholder="Enter your score"
                      type="number"
                      rightIcon={<Trophy className="w-4 h-4" />}
                      successMessage="Great score!"
                    />
                    <RetroInput
                      label="Password"
                      placeholder="Enter password"
                      type="password"
                      showPasswordToggle
                      isPassword
                      errorMessage="Password is required"
                    />
                    <RetroInput
                      label="Email"
                      placeholder="Enter email"
                      type="email"
                      leftIcon={<Heart className="w-4 h-4" />}
                    />
                  </div>
                </RetroCard>
              </RetroMotionItem>

              {/* Button Showcase */}
              <RetroMotionItem>
                <RetroCard
                  variant="secondary"
                  size="md"
                  className="mb-retro-8"
                  title="Button Variants"
                  subtitle="All button states and animations"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-retro-4">
                    <RetroButton variant="primary" size="md">Primary</RetroButton>
                    <RetroButton variant="secondary" size="md">Secondary</RetroButton>
                    <RetroButton variant="accent" size="md">Accent</RetroButton>
                    <RetroButton variant="outline" size="md">Outline</RetroButton>
                    <RetroButton variant="ghost" size="md">Ghost</RetroButton>
                    <RetroButton variant="destructive" size="md">Destructive</RetroButton>
                    <RetroButton variant="success" size="md">Success</RetroButton>
                    <RetroButton variant="primary" size="md" loading>Loading</RetroButton>
                  </div>
                </RetroCard>
              </RetroMotionItem>

              {/* Card Showcase */}
              <RetroMotionItem>
                <RetroCard
                  variant="accent"
                  size="md"
                  className="mb-retro-8"
                  title="Card Variants"
                  subtitle="Different card styles and states"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-retro-6">
                    <RetroCard
                      variant="default"
                      size="sm"
                      title="Default Card"
                      description="Standard card with subtle styling"
                      interactive
                      onClick={() => setSelectedCard(1)}
                      state={selectedCard === 1 ? 'selected' : 'default'}
                    />
                    <RetroCard
                      variant="primary"
                      size="sm"
                      title="Primary Card"
                      description="Card with primary color scheme"
                      interactive
                      onClick={() => setSelectedCard(2)}
                      state={selectedCard === 2 ? 'selected' : 'default'}
                    />
                    <RetroCard
                      variant="neon"
                      size="sm"
                      title="Neon Card"
                      description="Card with neon glow effects"
                      interactive
                      onClick={() => setSelectedCard(3)}
                      state={selectedCard === 3 ? 'selected' : 'default'}
                    />
                  </div>
                </RetroCard>
              </RetroMotionItem>

              {/* Performance Demo */}
              <RetroMotionItem>
                <RetroCard
                  variant="elevated"
                  size="lg"
                  className="mb-retro-8"
                  title="Performance Optimizations"
                  subtitle="Virtual scrolling and lazy loading"
                >
                  <div className="space-y-retro-6">
                    <div>
                      <h4 className="font-retro-primary text-retro-lg mb-retro-4">Virtual Scroll Demo</h4>
                      <div className="h-64 border-2 border-retro-border-neutral rounded-retro-lg overflow-hidden">
                        <RetroVirtualScroll
                          items={demoItems}
                          itemHeight={60}
                          containerHeight={256}
                          renderItem={(item, index) => (
                            <div className="flex items-center space-x-retro-4 p-retro-4 hover:bg-retro-bg-secondary transition-colors duration-retro-normal">
                              {item.icon}
                              <div>
                                <h5 className="font-retro-body text-retro-sm text-retro-text-primary">
                                  {item.title}
                                </h5>
                                <p className="font-retro-body text-retro-xs text-retro-text-secondary">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-retro-primary text-retro-lg mb-retro-4">Lazy Loading Demo</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-retro-4">
                        {[1, 2, 3].map((i) => (
                          <RetroLazyLoad
                            key={i}
                            fallback={
                              <div className="h-32 bg-retro-bg-secondary rounded-retro-lg flex items-center justify-center">
                                <div className="retro-spinner" />
                              </div>
                            }
                          >
                            <RetroOptimizedImage
                              src={`https://picsum.photos/300/200?random=${i}`}
                              alt={`Demo image ${i}`}
                              width={300}
                              height={200}
                              className="rounded-retro-lg"
                            />
                          </RetroLazyLoad>
                        ))}
                      </div>
                    </div>
                  </div>
                </RetroCard>
              </RetroMotionItem>

              {/* Accessibility Demo */}
              <RetroMotionItem>
                <RetroCard
                  variant="glass"
                  size="md"
                  className="mb-retro-8"
                  title="Accessibility Features"
                  subtitle="Screen reader support and keyboard navigation"
                >
                  <RetroAccessibility
                    role="region"
                    ariaLabel="Accessibility demo section"
                    className="space-y-retro-4"
                  >
                    <div className="flex items-center space-x-retro-4">
                      <RetroButton
                        variant="primary"
                        size="md"
                        ariaLabel="Play game button"
                      >
                        <Play className="w-4 h-4" />
                        <span className="sr-only">Play the game</span>
                      </RetroButton>
                      <RetroButton
                        variant="secondary"
                        size="md"
                        ariaLabel="Pause game button"
                      >
                        <Pause className="w-4 h-4" />
                        <span className="sr-only">Pause the game</span>
                      </RetroButton>
                    </div>
                    <p className="text-retro-sm text-retro-text-secondary">
                      All components include proper ARIA labels, keyboard navigation, and screen reader support.
                    </p>
                  </RetroAccessibility>
                </RetroCard>
              </RetroMotionItem>

              {/* Theme Switcher */}
              <RetroMotionItem>
                <RetroCard
                  variant="default"
                  size="lg"
                  title="Theme Customization"
                  subtitle="Adjust the design system settings"
                >
                  <RetroArcadeThemeSwitcher />
                </RetroCard>
              </RetroMotionItem>
            </RetroMotionContainer>
          </main>

          {/* Footer */}
          <RetroMotion animation="slideInUp">
            <footer className="border-t-2 border-retro-primary bg-retro-bg-secondary retro-pixel-border">
              <div className="container mx-auto px-retro-6 py-retro-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-retro-4">
                    <div className="retro-pixel-border bg-retro-accent p-retro-2 rounded-retro-base">
                      <Crown className="w-6 h-6 text-retro-text-inverse" />
                    </div>
                    <div>
                      <p className="font-retro-body text-retro-sm text-retro-text-primary">
                        Retro Arcade Design System
                      </p>
                      <p className="font-retro-body text-retro-xs text-retro-text-secondary">
                        Production-ready components for Gen Z creators
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-retro-4">
                    <RetroButton variant="outline" size="sm">
                      Documentation
                    </RetroButton>
                    <RetroButton variant="primary" size="sm">
                      Get Started
                    </RetroButton>
                  </div>
                </div>
              </div>
            </footer>
          </RetroMotion>
        </div>
      </RetroArcadeTheme>
    </RetroArcadeThemeProvider>
  );
};

export default RetroArcadeDemo;
