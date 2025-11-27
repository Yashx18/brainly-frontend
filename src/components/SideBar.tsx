import { useEffect, useState } from 'react';
import { SideBarItem } from './SideBarItems';
import { useContentStore } from '../store';
import { userInfo } from '../store';
import axios from 'axios';
import { HugeIcons } from './icons/HugeIcons';
import {
  Home09Icon,
  DocumentAttachmentIcon,
  Image03Icon,
  Video02Icon,
  Link01Icon,
  LogoutSquare01Icon,
  SidebarLeft01Icon,
  SidebarRight01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

// import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { filter, setFilter } = useContentStore();
  const [open, setOpen] = useState(false);
  const { getInfo } = userInfo();
  const API_URL = import.meta.env.VITE_API_URL;
  // const navigate = useNavigate();

  async function logOut() {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      window.location.reload();

      console.log('Logged out');
    } catch (err) {
      console.error('Logout failed', err);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 z-1 flex items-center justify-between border-r border-neutral-300 bg-white pt-2 transition duration-200 ease-in-out sm:static sm:flex-col sm:rounded-t-[0px] sm:pt-0',
        'h-auto w-full sm:h-screen sm:max-w-54',
        open ? 'px-3 pb-2 sm:px-0' : 'px-3 pb-2 sm:px-0'
      )}
    >
      <div className="flex w-full sm:flex-col">
        <div
          className={cn(
            'hidden w-full border-b border-neutral-300 transition duration-200 ease-in-out',
            'sm:flex',
            open ? 'items-center justify-between py-3 sm:px-2' : 'items-center justify-center py-4'
          )}
        >
          {/* LOGO SECTION */}
          {open ? (
            <div className="flex items-center gap-2">
              <svg
                width="64"
                height="30"
                viewBox="0 0 84 39"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-sky-600  "
              >
                <path
                  d="M0.00118755 38.7383V34.0583L19.8652 5.45828H1.14519V-0.0017221H27.7172V4.62628L7.85319 33.2783H28.1852V38.7383H0.00118755ZM36.1501 38.7383V21.2663L22.8901 -0.0017221H29.8061L40.4141 17.2103H37.9701L48.5261 -0.0017221H55.4421L42.2341 21.2663V38.7383H36.1501ZM53.2809 38.7383V-0.0017221H58.2209L79.9569 30.0023L77.6169 30.3663V-0.0017221H83.7009V38.7383H78.7609L57.1809 8.52628L59.4169 8.11028V38.7383H53.2809Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ) : null}
          {/* MENU ICON */}
          <div
            onClick={() => {
              setOpen((val) => !val);
            }}
            className="cursor-pointer transition-colors duration-150 hover:text-neutral-500"
          >
            {open ? (
              <HugeIcons
                size={22}
                color="currentColor"
                strokeWidth={1.5}
                icon={SidebarLeft01Icon}
              />
            ) : (
              <HugeIcons
                size={22}
                color="currentColor"
                strokeWidth={1.5}
                icon={SidebarRight01Icon}
              />
            )}
          </div>
        </div>
        <div className="flex h-auto w-full items-start gap-0.5 select-none sm:flex-col">
          <SideBarItem
            open={open}
            logo={
              <HugeIcons
                size={22}
                color="currentColor"
                strokeWidth={1.5}
                icon={Home09Icon}
                className={cn(filter === 'all' ? 'text-blue-600' : '')}
              />
            }
            text={'Home'}
            onClick={() => {
              setFilter('all');
            }}
          />
          <SideBarItem
            open={open}
            logo={
              <HugeIcons
                size={22}
                color="currentColor"
                strokeWidth={1.5}
                icon={DocumentAttachmentIcon}
                className={cn(filter === 'text' ? 'text-blue-600' : '')}
              />
            }
            text={'Documents'}
            onClick={() => {
              setFilter('text');
            }}
          />
          <SideBarItem
            open={open}
            logo={
              <HugeIcons
                size={22}
                color="currentColor"
                strokeWidth={1.5}
                icon={Image03Icon}
                className={cn(filter === 'image' ? 'text-blue-600' : '')}
              />
            }
            text={'Images'}
            onClick={() => {
              setFilter('image');
            }}
          />
          <SideBarItem
            open={open}
            logo={
              <HugeIcons
                size={22}
                color="currentColor"
                strokeWidth={1.5}
                icon={Video02Icon}
                className={cn(filter === 'video' ? 'text-blue-600' : '')}
              />
            }
            text={'Videos'}
            onClick={() => {
              setFilter('video');
            }}
          />
          <SideBarItem
            open={open}
            logo={
              <HugeIcons
                size={22}
                color="currentColor"
                strokeWidth={1.5}
                icon={Link01Icon}
                className={cn(filter === 'URL' ? 'text-blue-600' : '')}
              />
            }
            text={'Links'}
            onClick={() => {
              setFilter('URL');
            }}
          />
        </div>
      </div>
      {/* Logout button */}
      <div
        onClick={logOut}
        className={cn(
          'text-md mx-2 flex w-auto cursor-pointer items-center justify-center bg-blue-600 py-2 font-medium transition-colors duration-200 hover:bg-blue-500 sm:py-3',
          open
            ? 'rounded-lg px-8 text-white'
            : 'rounded-md px-2 text-neutral-200 hover:text-neutral-100 sm:mx-0 sm:w-15/20 sm:px-4'
        )}
      >
        {open ? (
          <span
            className={cn(
              'w-auto shrink-0 cursor-pointer items-center justify-center gap-2',
              'sm:flex sm:w-full'
            )}
          >
            <HugeIcons size={24} color="currentColor" strokeWidth={2} icon={LogoutSquare01Icon} />
            <p className="hidden w-fit sm:flex">Logout</p>
          </span>
        ) : (
          <HugeIcons
            size={24}
            color="currentColor"
            className="size-5 shrink-0"
            strokeWidth={2}
            icon={LogoutSquare01Icon}
          />
        )}
      </div>
    </div>
  );
};

export default SideBar;
