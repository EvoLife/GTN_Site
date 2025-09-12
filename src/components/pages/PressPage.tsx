import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function PressPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4">Press</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Latest news, press releases, and media coverage of our global innovation community.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2">Press Release</Badge>
            <CardTitle>Global Innovation Network Expands to 25 Cities</CardTitle>
            <CardDescription>March 12, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our community reaches new milestone with the opening of five new hubs across emerging markets...
            </p>
            <Button variant="outline">Read Full Release</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2">Media Coverage</Badge>
            <CardTitle>Featured in TechCrunch: "The Future of Collaborative Innovation"</CardTitle>
            <CardDescription>March 5, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">View Article</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl mb-4">Media Inquiries</h2>
          <p className="text-muted-foreground mb-6">
            For press inquiries, interviews, or media resources, please contact our communications team.
          </p>
          <Button>Contact Press Team</Button>
        </CardContent>
      </Card>
    </div>
  );
}