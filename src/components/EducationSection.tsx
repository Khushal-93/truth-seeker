import { Eye, Brain, Fingerprint, Camera } from "lucide-react";

const educationCards = [
  {
    icon: Eye,
    title: "Look at the Eyes",
    description: "Fake images often have weird eyes - they might not blink naturally or look in different directions.",
    color: "primary",
  },
  {
    icon: Brain,
    title: "Check the Background",
    description: "Look for blurry or wavy backgrounds. AI sometimes makes the area around a person look strange.",
    color: "accent",
  },
  {
    icon: Fingerprint,
    title: "Notice the Details",
    description: "Hair, jewelry, and fingers are hard to fake. Look for missing earrings or extra fingers!",
    color: "warning",
  },
  {
    icon: Camera,
    title: "Source Matters",
    description: "Always check where the image came from. Official sources are more trustworthy than random posts.",
    color: "success",
  },
];

const EducationSection = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Become a <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">Deepfake Detective</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Learn the signs that experts look for when spotting fake images and videos.
            With practice, you can protect yourself and others!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationCards.map((card, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white border border-border shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-200 ease-in-out hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl mb-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ease-in-out ${
                card.color === 'primary' ? 'bg-primary/10' :
                card.color === 'accent' ? 'bg-accent/10' :
                card.color === 'warning' ? 'bg-warning/10' :
                'bg-success/10'
              }`}>
                <card.icon className={`w-7 h-7 ${
                  card.color === 'primary' ? 'text-primary' :
                  card.color === 'accent' ? 'text-accent-foreground' :
                  card.color === 'warning' ? 'text-warning' :
                  'text-success'
                }`} />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
