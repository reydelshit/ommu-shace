import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  CalendarIcon,
  Clock,
  EarthLock,
  Globe,
  ImagePlus,
  ShieldCheck,
  Ticket,
  Users,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

// Temporary badge data
const badges = [
  { id: 1, name: 'Health and Well-being', color: 'red' },
  { id: 2, name: 'Trust and Transparency', color: 'blue' },
  { id: 3, name: 'Sustainability', color: 'green' },
  { id: 4, name: 'Social Connection', color: 'orange' },
  { id: 5, name: 'Education', color: 'purple' },
  { id: 6, name: 'Economic Stability', color: 'yellow' },
];

const DEFAULT_CENTER: LatLngTuple = [6.2245, 125.0608];

function LocationPicker({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function EventFormContainer() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedLocation, setSelectedLocation] = useState<LatLngTuple>();
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    tickets: '',
    approval: '',
    capacity: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation([lat, lng]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      ...formData,
      date: selectedDate,
      location: selectedLocation,
      badges: selectedBadges,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full mx-auto h-[1100px]">
      <div className="flex items-center mb-8 text-yellow-text">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mr-2 cursor-pointer"
        >
          ←
        </Button>
        <h1 className="text-2xl font-bold">Create your first event!</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex w-full gap-4">
            {/* image file uplaod  */}
            <div className="space-y-2">
              <div className="relative flex items-center justify-center w-[350px] h-[350px] border border-dashed border-gray-300 rounded-lg overflow-hidden">
                <Label
                  htmlFor="image-upload"
                  className="absolute inset-0 flex items-center justify-center w-full h-full cursor-pointer bg-black/10 hover:bg-black/20 transition"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Uploaded Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImagePlus className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="text-sm text-gray-500">Click to upload</p>
                    </div>
                  )}
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="space-y-4 w-full">
              <div className="flex gap-4 items-center">
                <div className="w-full">
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input
                    id="eventName"
                    name="eventName"
                    placeholder="Enter event name"
                    className="mt-1"
                    value={formData.eventName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="visibility">Visibility</Label>

                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Event Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public" className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        <span className="text-sm">Public</span>
                      </SelectItem>
                      <SelectItem value="private">
                        <EarthLock className="h-4 w-4 mr-2" />
                        <span className="text-sm">Private</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 justify-between">
                <div className="w-full">
                  <Label>Start Date</Label>
                  <Input name="start_date" type="datetime-local" />
                </div>

                <div className="w-full">
                  <Label>End Date</Label>
                  <Input name="end_date" type="datetime-local" />
                </div>
              </div>

              <div>
                <Label>Location</Label>
                <div className="mt-1 h-[200px] rounded-lg overflow-hidden border">
                  <MapContainer
                    center={DEFAULT_CENTER}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                    {selectedLocation && <Marker position={selectedLocation} />}
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-4 flex-row-reverse">
            <div className="w-[100%] h-full">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your event"
                className="mt-1 h-[250px]"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-4 w-[50%]">
              <div>
                <Label>Event Options</Label>
                <div className="space-y-2 mt-1">
                  <div className="flex items-center space-x-2">
                    <Ticket className="h-4 w-4" />
                    <Input
                      name="tickets"
                      placeholder="Tickets (To develop)"
                      value={formData.tickets}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-4 w-4" />
                    <Input
                      name="approval"
                      placeholder="Required Approval"
                      value={formData.approval}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <Input
                      name="capacity"
                      placeholder="Capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {badges.map((badge) => (
                    <Badge
                      key={badge.id}
                      variant={
                        selectedBadges.includes(badge.name)
                          ? 'default'
                          : 'outline'
                      }
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedBadges((prev) =>
                          prev.includes(badge.name)
                            ? prev.filter((b) => b !== badge.name)
                            : [...prev, badge.name],
                        );
                      }}
                    >
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end items-center">
            <Button type="submit">Create Event</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EventFormContainer;
