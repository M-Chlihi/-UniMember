import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/input";
import Spinner from "../components/ui/spinner";
import EmptyState from "../components/feedback/EmptyState";
export default function SPPP() {
  return (
    <>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>

      <Button loading>Publishing</Button>

      <Card title="Example card">Content</Card>

      <Badge variant="success">OPEN</Badge>

      <Badge variant="warning">SCHEDULED</Badge>

      <Input label="Email" />

      <Spinner size="lg" />

      <EmptyState title="No polls" message="There are currently no polls." />
    </>
  );
}
