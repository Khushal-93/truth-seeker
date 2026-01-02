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
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Become a <span className="text-gradient">Deepfake Detective</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn the signs that experts look for when spotting fake images and videos.
            With practice, you can protect yourself and others!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationCards.map((card, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-${card.color}/10 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-6 h-6 text-${card.color}`} />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
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
