import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckIcon, CopyIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { FacebookIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
const ShareModal = () => {
  const [copied, setCopied] = useState(false);

  const shareUrlLink = window.location.href;
  const title = 'Check out this cool event';

  const socialShares = [
    {
      name: 'Twitter',
      icon: TwitterLogoIcon,
      onClick: () => {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrlLink)}`;
        window.open(shareUrl, '_blank');
      },
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      onClick: () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrlLink)}`;
        window.open(shareUrl, '_blank');
      },
    },

    {
      name: 'Instagram',
      icon: InstagramLogoIcon,
      onClick: () => {
        const shareUrl = `https://www.instagram.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrlLink)}`;
        window.open(shareUrl, '_blank');
      },
    },

    {
      name: 'LinkedIn',
      icon: LinkedInLogoIcon,
      onClick: () => {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrlLink)}`;
        window.open(shareUrl, '_blank');
      },
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrlLink)
      .then(() => {
        setCopied(true);
        toast.success('Link copied to clipboard', {
          description: shareUrlLink,
          duration: 2000,
        });

        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CopyIcon className="mr-2 h-4 w-4" /> Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>Share this link with your friends and colleagues</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={shareUrlLink} readOnly className="h-9" />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopyLink}>
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            <span className="sr-only">Copy</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-4">
          {socialShares.map((platform) => (
            <Button key={platform.name} variant="outline" onClick={platform.onClick} className="w-full">
              <platform.icon className="mr-2 h-4 w-4" />
              {platform.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ShareModal;
