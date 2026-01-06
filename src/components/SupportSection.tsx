import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SupportSection = () => {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Message Sent",
            description: "We've received your message and will get back to you shortly.",
        });
    };

    return (
        <section id="support" className="py-24 px-4 bg-secondary/30">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                        Need <span className="text-primary">Help?</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We are here to support you in detecting deepfakes.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                Contact Us
                            </CardTitle>
                            <CardDescription>
                                Send us a message and we'll get back to you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Input placeholder="Your Name" className="bg-background/50" />
                                </div>
                                <div className="space-y-2">
                                    <Input type="email" placeholder="Email Address" className="bg-background/50" />
                                </div>
                                <div className="space-y-2">
                                    <Textarea placeholder="How can we help?" className="bg-background/50 min-h-[120px]" />
                                </div>
                                <Button className="w-full gap-2 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-white font-semibold">
                                    <Send className="w-4 h-4" /> Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    FAQ
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-1">How accurate is the detection?</h4>
                                    <p className="text-sm text-muted-foreground">Our model provides a confidence score based on visual artifacts. It is a tool for assistance, not absolute proof.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Is my data private?</h4>
                                    <p className="text-sm text-muted-foreground">Yes, images are analyzed in real-time and are not stored after the session ends.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Which file types are supported?</h4>
                                    <p className="text-sm text-muted-foreground">We support standard image formats like JPG and PNG for analysis.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportSection;
