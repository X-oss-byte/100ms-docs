import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import { titleCasing } from '../lib/utils';

const references = {
    Web: '/docs/api-reference/javascript/v2/home/content',
    Android: '/docs/api-reference/android/v2/index.html',
    'React Native': '/docs/api-reference/react-native/v2/modules.html',
    Flutter:
        'https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html',
    iOS: '/docs/api-reference/ios/v2/home/content'
    // 'Server side': ''
};

const PlatformAccordion = ({
    title,
    icon,
    data,
    openPlatformAccordion,
    setOpenPlatformAccordion,
    id
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (openPlatformAccordion !== id) setOpen(false);
    });

    return (
        <div>
            <div
                onClick={() => {
                    setOpen((prev) => !prev);
                    setOpenPlatformAccordion(id);
                }}
                className="plat-accordion"
                style={{
                    minWidth: '240px',
                    width: '100%'
                }}>
                <Flex gap="2">
                    <Flex css={{ color: '$primaryLight' }}>{icon}</Flex>
                    <Text css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>{title}</Text>
                </Flex>
                <Flex css={{ color: open ? '$textMedEmp' : '$textHighEmp' }}>
                    <ChevronDownIcon
                        style={{
                            color: 'inherit',
                            transition: 'all 0.3s ease',
                            transform: open ? 'rotateZ(-180deg)' : ''
                        }}
                    />
                </Flex>
            </div>

            <div className={`plat-accordion-content ${open ? 'active-plat-accordion' : ''}`}>
                {Object.keys(data['v2']).map((item) => (
                    // For when all children are accordions
                    <a
                        href={`/docs${
                            data['v2'][item][Object.keys(data['v2'][item])[0]]?.url ||
                            data['v2'][item][Object.keys(data['v2'][item])[0]][
                                Object.keys(data['v2'][item][Object.keys(data['v2'][item])[0]])[0]
                            ].url
                        }`}
                        key={`${title}-${item}`}>
                        <Text
                            variant="sm"
                            css={{ pl: '$12', my: '$8', color: 'var(--docs_text_primary)' }}>
                            {titleCasing(item)}
                        </Text>
                    </a>
                ))}
                {title !== 'Server side' ? (
                    <a href={references[title]}>
                        <Text
                            variant="sm"
                            css={{ pl: '$12', my: '$8', color: 'var(--docs_text_primary)' }}>
                            API Reference
                        </Text>
                    </a>
                ) : null}
            </div>
        </div>
    );
};

export default PlatformAccordion;