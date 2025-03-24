import { Button } from '@/components/ui/button';
import OmmuLogo from '@/assets/LOGO.png';
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
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout, session } = useSession();

  return (
    <header className="flex w-full justify-between items-center h-24 sticky top-0 z-50  px-4 bg-brown-text">
      <Link to={session ? '/dashboard' : '/'}>
        <img className="w-20 " src={OmmuLogo} alt="ommu_logo" />
      </Link>

      <div className="flex gap-4 items-center h-full z-10 ">
        <Button className={`cursor-pointer ${session ? 'bg-yellow-text text-black' : ''}`}>{session ? 'For Creators' : 'Become a Patron'}</Button>

        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              {' '}
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
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
