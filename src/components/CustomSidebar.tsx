import React, { useRef, useState } from 'react';
import { IonIcon, IonItem, IonList } from '@ionic/react';
import { peopleOutline, cashOutline, homeOutline, personOutline, helpCircleOutline, logOutOutline, people, cash, home, helpCircle, person, logOut } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './CustomSidebar.css'

const BUTTON_STYLE = "text-2xl !text-[#082374] flex justify-start items-center gap-2 relative";

const LABEL_STYLE = "text-sm absolute pl-10 truncate";

interface CustomSidebarProps {
    isExpanded: boolean,
    setIsExpanded: (value: boolean) => void;
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({ isExpanded, setIsExpanded }) => {
    const history = useHistory();

    const navigateAndCloseMenu = (path: string) => {
        history.push(path);
    };


    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const touchX = e.touches[0].clientX;
        setCurrentX(touchX);
        const width = touchX > 300 ? 300 : touchX < 60 ? 60 : touchX;
        if (sidebarRef.current) {
            sidebarRef.current.style.width = `${width}px`;
        }
    };

    const handleTouchEnd = () => {
        setIsExpanded(currentX > 150);
        if (sidebarRef.current) {
            sidebarRef.current.style.width = currentX > 150 ? '300px' : '60px';
        }
        setStartX(0);
        setCurrentX(0);
    };

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            ref={sidebarRef}
            className={`shadowxl shadow-[4px_5px_6px_rgb(0,0,0,.3)] sidebar-custom ${isExpanded ? 'expanded' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className='flex flex-col gap-4 p-4'>

                <button className={`${BUTTON_STYLE}`} onClick={() => navigateAndCloseMenu('/adherents')}>
                    <IonIcon icon={people} slot="start" />
                    {isExpanded && <div className={`${LABEL_STYLE}`}>Adhérents</div>}
                </button>

                <button className={`${BUTTON_STYLE}`}>
                    <IonIcon icon={cash} slot="start" />
                    {isExpanded && <div className={`${LABEL_STYLE}`}>Remboursements</div>}
                </button>

                <button className={`${BUTTON_STYLE}`}>
                    <IonIcon icon={home} slot="start" />
                    {isExpanded && <div className={`${LABEL_STYLE}`}>Déclaration salaires</div>}
                </button>

                <button className={`${BUTTON_STYLE}`}>
                    <IonIcon icon={helpCircle} slot="start" />
                    {isExpanded && <div className={`${LABEL_STYLE}`}>Assistance</div>}
                </button>

                <button className={`${BUTTON_STYLE}`}>
                    <IonIcon icon={person} slot="start" />
                    {isExpanded && <div className={`${LABEL_STYLE}`}>Profile</div>}
                </button>

                <button className={`${BUTTON_STYLE}`}>
                    <IonIcon icon={logOut} slot="start" />
                    {isExpanded && <div className={`${LABEL_STYLE}`}>Se déconnecter</div>}
                </button>
            </div>
        </div>
    );
};

export default CustomSidebar;
