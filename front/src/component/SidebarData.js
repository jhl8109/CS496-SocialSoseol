import React from 'react';
import * as BsIcons from 'react-icons/bs';
export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <BsIcons.BsFillHouseDoorFill />,
        cName: 'nav-text'
    },
    {
        title: '릴레이 소설',
        path: '/relay/novel',
        icon: <BsIcons.BsPersonBoundingBox />,
        cName: 'nav-text'
    },
    {
        title: '릴레이 시',
        path: '/relay/poem',
        icon: <BsIcons.BsPersonBoundingBox />,
        cName: 'nav-text'
    },
    {
        title: '개인 소설',
        path: '/personal/poem',
        icon: <BsIcons.BsPersonBoundingBox />,
        cName: 'nav-text'
    },
    {
        title: '개인 시',
        path: '/personal/poem',
        icon: <BsIcons.BsPersonBoundingBox />,
        cName: 'nav-text'
    },
    {
        title: 'About',
        path: '/About',
        icon: <BsIcons.BsFillInfoCircleFill />,
        cName: 'nav-text'
    },
    {
        title: '제작자',
        path: '/contact',
        icon: <BsIcons.BsEnvelopeFill />,
        cName: 'nav-text'
    }
];