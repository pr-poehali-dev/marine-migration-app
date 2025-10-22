import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AnimalData {
  id: string;
  name: string;
  species: string;
  location: string;
  coordinates: [number, number];
  route: string;
  status: 'active' | 'resting';
}

interface WeatherData {
  region: string;
  temp: number;
  wind: number;
  waves: number;
  windDirection: string;
}

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState('barents');
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const animals: AnimalData[] = [
    {
      id: '1',
      name: 'Белуха #B247',
      species: 'Белуха',
      location: 'Баренцево море',
      coordinates: [69.5, 43.2],
      route: 'Север → Восток',
      status: 'active'
    },
    {
      id: '2',
      name: 'Горбатый кит #H891',
      species: 'Горбатый кит',
      location: 'Охотское море',
      coordinates: [54.2, 145.8],
      route: 'Юг → Север',
      status: 'active'
    },
    {
      id: '3',
      name: 'Тюлень #S156',
      species: 'Гренландский тюлень',
      location: 'Белое море',
      coordinates: [66.0, 40.5],
      route: 'Локально',
      status: 'resting'
    },
    {
      id: '4',
      name: 'Дельфин #D332',
      species: 'Афалина',
      location: 'Черное море',
      coordinates: [43.5, 39.8],
      route: 'Восток → Запад',
      status: 'active'
    }
  ];

  const weatherData: WeatherData[] = [
    { region: 'Баренцево море', temp: 4, wind: 12, waves: 1.8, windDirection: 'СЗ' },
    { region: 'Охотское море', temp: 8, wind: 8, waves: 1.2, windDirection: 'В' },
    { region: 'Белое море', temp: 2, wind: 15, waves: 2.1, windDirection: 'С' },
    { region: 'Черное море', temp: 14, wind: 6, waves: 0.8, windDirection: 'ЮВ' }
  ];

  const regions = [
    { id: 'barents', name: 'Баренцево море', lat: 72, lon: 40 },
    { id: 'okhotsk', name: 'Охотское море', lat: 56, lon: 148 },
    { id: 'white', name: 'Белое море', lat: 66, lon: 38 },
    { id: 'black', name: 'Черное море', lat: 43, lon: 35 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted/50">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl animate-wave origin-bottom inline-block">🌊</div>
              <h1 className="text-2xl font-heading font-bold text-secondary">
                Marine Migration Tracker
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="text-sm">
                <Icon name="Map" className="mr-2" size={16} />
                Карта
              </Button>
              <Button variant="ghost" className="text-sm">
                <Icon name="Fish" className="mr-2" size={16} />
                Животные
              </Button>
              <Button variant="ghost" className="text-sm">
                <Icon name="Cloud" className="mr-2" size={16} />
                Погода
              </Button>
              <Button variant="ghost" className="text-sm">
                <Icon name="Globe" className="mr-2" size={16} />
                Регионы
              </Button>
              <Button variant="ghost" className="text-sm">
                <Icon name="Info" className="mr-2" size={16} />
                О проекте
              </Button>
              <Button variant="ghost" className="text-sm">
                <Icon name="BookOpen" className="mr-2" size={16} />
                Блог
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold flex items-center gap-2">
                  <Icon name="MapPin" size={24} className="text-primary" />
                  Интерактивная карта
                </h2>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <Icon name="Radio" size={12} className="mr-1" />
                  В реальном времени
                </Badge>
              </div>

              <div className="relative bg-secondary/5 rounded-xl border-2 border-primary/20 h-[400px] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {regions.map((region) => (
                    <Button
                      key={region.id}
                      size="sm"
                      variant={selectedRegion === region.id ? 'default' : 'outline'}
                      onClick={() => setSelectedRegion(region.id)}
                      className="text-xs"
                    >
                      {region.name}
                    </Button>
                  ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full p-8">
                    {animals.map((animal, idx) => (
                      <div
                        key={animal.id}
                        className={`absolute cursor-pointer transition-all duration-300 hover:scale-125 ${
                          selectedAnimal === animal.id ? 'scale-125 z-20' : 'z-10'
                        }`}
                        style={{
                          left: `${20 + idx * 20}%`,
                          top: `${30 + idx * 15}%`
                        }}
                        onClick={() => setSelectedAnimal(animal.id)}
                      >
                        <div className="relative animate-float" style={{ animationDelay: `${idx * 0.5}s` }}>
                          <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-2xl backdrop-blur-sm">
                            {animal.species.includes('кит') ? '🐋' : animal.species.includes('Тюлень') ? '🦭' : '🐬'}
                          </div>
                          {animal.status === 'active' && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                          )}
                        </div>
                        {selectedAnimal === animal.id && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-xs whitespace-nowrap animate-scale-in shadow-lg">
                            <div className="font-semibold">{animal.name}</div>
                            <div className="text-secondary-foreground/70">{animal.location}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Navigation" size={16} className="text-primary" />
                    <span className="text-muted-foreground">Масштаб: 1:5000</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
                <Icon name="Fish" size={24} className="text-primary" />
                Отслеживаемые животные
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {animals.map((animal) => (
                  <Card
                    key={animal.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 ${
                      selectedAnimal === animal.id ? 'border-primary shadow-md bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedAnimal(animal.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {animal.species.includes('кит') ? '🐋' : animal.species.includes('Тюлень') ? '🦭' : '🐬'}
                        </span>
                        <div>
                          <h3 className="font-heading font-semibold text-sm">{animal.name}</h3>
                          <p className="text-xs text-muted-foreground">{animal.species}</p>
                        </div>
                      </div>
                      <Badge variant={animal.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {animal.status === 'active' ? 'Активен' : 'Отдых'}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="MapPin" size={14} />
                        <span>{animal.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Route" size={14} />
                        <span>{animal.route}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
                <Icon name="Cloud" size={24} className="text-primary" />
                Погодные условия
              </h2>
              <Tabs defaultValue={weatherData[0].region} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  {weatherData.slice(0, 2).map((data) => (
                    <TabsTrigger key={data.region} value={data.region} className="text-xs">
                      {data.region.split(' ')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {weatherData.map((data) => (
                  <TabsContent key={data.region} value={data.region} className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon name="Thermometer" size={18} className="text-primary" />
                          <span className="text-sm font-medium">Температура</span>
                        </div>
                        <span className="text-lg font-heading font-bold text-primary">{data.temp}°C</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon name="Wind" size={18} className="text-primary" />
                          <span className="text-sm font-medium">Ветер</span>
                        </div>
                        <span className="text-lg font-heading font-bold text-primary">
                          {data.wind} м/с {data.windDirection}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon name="Waves" size={18} className="text-primary" />
                          <span className="text-sm font-medium">Волны</span>
                        </div>
                        <span className="text-lg font-heading font-bold text-primary">{data.waves} м</span>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
                <Icon name="Globe" size={24} className="text-primary" />
                Статистика
              </h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-3xl font-heading font-bold text-primary mb-1">
                    {animals.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Отслеживаемых животных</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-3xl font-heading font-bold text-accent mb-1">
                    {regions.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Морских регионов</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-3xl font-heading font-bold text-secondary mb-1">
                    {animals.filter(a => a.status === 'active').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Активных миграций</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-lg font-heading font-semibold mb-3 flex items-center gap-2">
                <Icon name="Info" size={20} className="text-primary" />
                О проекте
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Мониторинг морской жизни в реальном времени. Отслеживаем миграции китов, дельфинов и тюленей с помощью спутниковых данных.
              </p>
              <Button className="w-full" variant="outline">
                <Icon name="BookOpen" className="mr-2" size={16} />
                Читать в блоге
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-12 py-8 bg-secondary/5">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Marine Migration Tracker. Данные обновляются каждые 3 часа.</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a href="#" className="hover:text-primary transition-colors">Telegram</a>
            <span>·</span>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <span>·</span>
            <a href="#" className="hover:text-primary transition-colors">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
