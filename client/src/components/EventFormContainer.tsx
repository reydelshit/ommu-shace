import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateEvent } from '@/hooks/useEvent';
import { useSession } from '@/hooks/useSession';
import { useUserLocation } from '@/hooks/useUserLocation';
import { badges } from '@/lib/badges';
import type { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EarthLock, Globe, ImagePlus, ShieldCheck, Ticket, Users } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function LocationPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function EventFormContainer() {
  const { user } = useSession();
  const createEventMutation = useCreateEvent();
  const [selectedLocation, setSelectedLocation] = useState<LatLngTuple>();
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    tickets: '',
    approval: false,
    capacity: 0,
    location: '',
    start_date: '',
    end_date: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedVisibility, setSelectedVisibility] = useState<string>('');
  const [errorCreateEvent, setErrorCreateEvent] = useState('');
  const navigate = useNavigate();

  const DEFAULT_CENTER = useUserLocation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file); // Store file for upload

      // Release old preview URL before creating a new one
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // Generate new preview URL
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // cleanup to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation([lat, lng]);

    console.log(lat, lng);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('eventName', formData.eventName);
    data.append('description', formData.description);
    data.append('tickets', formData.tickets || 'Free');
    data.append('isNeedApproval', String(formData.approval));
    data.append('capacity', String(formData.capacity));
    data.append('location', formData.location);
    data.append('markedLocation', selectedLocation?.join(',') || '');
    data.append('startDate', formData.start_date);
    data.append('endDate', formData.end_date);
    data.append('tags', selectedBadges.join(','));
    data.append('visibility', selectedVisibility);
    data.append('userId', user?.id || '');

    // Append the actual file, not a URL
    if (selectedFile) {
      data.append('banner', selectedFile);
    }

    createEventMutation.mutate(data, {
      onSuccess: (data) => {
        console.log('Event created:', data);
        toast('Event created successfully.', {
          description: 'You can now view your event in the dashboard.',
        });

        const eventID = data.data.event.id || data.data.event?.id;

        // clear all fields after successful submission
        setFormData({
          eventName: '',
          description: '',
          tickets: '',
          approval: false,
          capacity: 0,
          location: '',
          start_date: '',
          end_date: '',
        });
        setSelectedLocation(undefined);
        setSelectedBadges([]);
        setSelectedVisibility('');
        setSelectedFile(null);
        setImagePreview(null);

        navigate(`/manage-event/${eventID}`);
      },

      onError: (error: any) => {
        if (error.response) {
          console.error('Event creation failed:', error.response.data);
          setErrorCreateEvent(error.response.data.message);
        } else {
          console.error('Event creation failed:', error.message);
        }
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full  mx-auto h-[1500px]">
      <div className="flex items-center mb-8 text-yellow-text">
        <Button onClick={() => navigate(-1)} variant="ghost" className="mr-2 cursor-pointer">
          ←
        </Button>
        <h1 className="text-2xl font-bold">Create your first event!</h1>
      </div>

      <form className="px-12" onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="relative flex items-center justify-center w-full h-[250px] border border-dashed border-gray-300 rounded-lg overflow-hidden">
            <Label
              htmlFor="image-upload"
              className="absolute inset-0 flex items-center justify-center w-full h-full cursor-pointer bg-black/10 hover:bg-black/20 transition"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Uploaded Preview" className="object-cover w-full h-full" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImagePlus className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload</p>
                </div>
              )}
            </Label>
            <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          <div className="space-y-4 w-full">
            <div className="flex gap-4 items-center">
              <div className="w-full">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  name="eventName"
                  placeholder="Enter event name"
                  className="mt-1 bg-gray-100"
                  value={formData.eventName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="visibility">Visibility</Label>

                <Select onValueChange={(value) => setSelectedVisibility(value)}>
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
                <Input
                  name="start_date"
                  className="mt-1 bg-gray-100"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  type="datetime-local"
                />
              </div>

              <div className="w-full">
                <Label>End Date</Label>
                <Input name="end_date" className="mt-1 bg-gray-100" value={formData.end_date} onChange={handleInputChange} type="datetime-local" />
              </div>
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                className="mt-1 bg-gray-100"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
              />

              {formData.location && (
                <>
                  <Label className="mt-2">Can you mark where is it?</Label>
                  <div className="mt-1 bg-gray-100 h-[300px] rounded-lg overflow-hidden border relative z-0">
                    <MapContainer center={DEFAULT_CENTER || [0, 0]} zoom={16} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationPicker onLocationSelect={handleLocationSelect} />
                      {selectedLocation && <Marker position={selectedLocation} />}
                    </MapContainer>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex w-full gap-4 flex-row-reverse">
            <div className="w-[700px] h-full">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your event"
                className="mt-1 bg-gray-100 h-[250px] break-words whitespace-pre-wrap w-full"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-4 w-[50%]">
              <div>
                <Label>Event Options</Label>
                <div className="space-y-2 mt-1 bg-gray-100">
                  <div className="flex items-center space-x-2">
                    <Ticket className="h-4 w-4" />
                    <Input name="tickets" placeholder="Tickets (To develop)" value={formData.tickets} onChange={handleInputChange} disabled />
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-4 w-4" />
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Input
                        type="checkbox"
                        name="approval"
                        checked={formData.approval}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            approval: e.target.checked,
                          })
                        }
                        className="hidden"
                      />
                      <div className={`w-4 h-4 border ${formData.approval ? 'bg-blue-500 border-black' : 'bg-gray-300 border-gray-400'}`}></div>
                      <span className="text-sm">{formData.approval ? 'Approval is required' : 'Required for approval?'}</span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <Input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant={selectedBadges.includes(badge.name) ? 'default' : 'outline'}
                      className="cursor-pointer p-1 rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedBadges((prev) => (prev.includes(badge.name) ? prev.filter((b) => b !== badge.name) : [...prev, badge.name]));
                      }}
                    >
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <img src={badge.image} alt={badge.name} className="w-6 h-6" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{badge.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {errorCreateEvent && <div className="text-red-500">{errorCreateEvent}</div>}
          <div className="pt-4 flex justify-end items-center">
            <Button type="submit">Submit Event</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EventFormContainer;
