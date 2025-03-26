import React, { useState } from 'react';
import { Copy, Link, Twitter, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShareModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const socialShareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?body=Check out this link: ${encodeURIComponent(shareUrl)}`,
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Share</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-lg p-6 w-96 max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">Share this page</h2>

            <div className="flex justify-between mb-4">
              <a href={socialShareLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:bg-gray-100 p-2 rounded-full">
                <Twitter className="w-6 h-6 text-blue-400" />
              </a>
              <a href={socialShareLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:bg-gray-100 p-2 rounded-full">
                <Facebook className="w-6 h-6 text-blue-600" />
              </a>
              <a href={socialShareLinks.email} className="hover:bg-gray-100 p-2 rounded-full">
                <Mail className="w-6 h-6 text-gray-600" />
              </a>
            </div>

            <div className="flex items-center border rounded-md p-2">
              <input type="text" value={shareUrl} readOnly className="flex-grow bg-transparent outline-none mr-2" />
              <button onClick={handleCopyLink} className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareModal;
