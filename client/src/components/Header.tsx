import OmmuLogo from '@/assets/LOGO.png';
import { Button } from '@/components/ui/button';
import { useSession } from '@/hooks/useSession';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLoginModalStore } from '@/store/useLoginModalStore';
import { Link } from 'react-router-dom';
import DefaultProfile from '@/assets/defaultProfile.png';
const Header = () => {
  const { user, logout, session } = useSession();
  const { setShowLoginModal } = useLoginModalStore();
  return (
    <header className="flex w-full justify-between items-center h-24 sticky top-0 z-50  px-4 bg-brown-text">
      <Link to={session ? '/dashboard' : '/'}>
        <img className="w-12 " src={OmmuLogo} alt="ommu_logo" />
      </Link>

      <div className="flex gap-4 items-center h-full z-10 ">
        <div className="flex gap-2 ">
          <Button className={`cursor-pointer ${session ? 'bg-yellow-text text-black' : ''}`}>{session ? 'For Creators' : 'Become a Patron'}</Button>

          {!session && (
            <Button className="cursor-pointer" onClick={() => setShowLoginModal(true)}>
              Login
            </Button>
          )}
        </div>

        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              {' '}
              <Avatar className=" h-11 w-11  object-cover  bg-white border-white cursor-pointer">
                <AvatarImage
                  src={
                    user?.profilePicture && user.profilePicture.trim() !== ''
                      ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}`
                      : DefaultProfile
                  }
                  alt="Emma Roberts"
                  className="object-cover"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.fullname}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link to="/profile/settings">Settings</Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
