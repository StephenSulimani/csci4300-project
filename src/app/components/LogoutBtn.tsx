import { LogOut } from 'lucide-react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface LogoutBtnProps {
    router: AppRouterInstance;
}

export default function LogoutBtn(props: LogoutBtnProps) {
    const LogOutClick = async () => {
        await fetch('/api/logout');
        props.router.push('/login');
    };

    return (
        <button
            className="flex items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
            onClick={LogOutClick}
        >
            <LogOut className="h-4 w-4" />
            Logout
        </button>
    );
}
