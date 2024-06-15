// modal.tsx
import React from 'react';
import { View, Modal as RNModal, StyleSheet } from 'react-native';

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    return (
        <RNModal
            transparent
            visible={isOpen}
            animationType="slide"
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {children}
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
});

export default Modal;
