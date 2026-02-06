import { useState, useEffect } from 'react';
import {
    FiCamera, FiEdit2, FiInstagram, FiSave, FiX,
    FiMapPin, FiCalendar, FiMail, FiPhone, FiLogOut, FiUser, FiHome
} from 'react-icons/fi';
import { useAuth } from '../login/AuthContext';

export default function UserProfile() {
    const { user: authUser, updateUser, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const [userData, setUserData] = useState({
        username: authUser?.username || '',
        firstName: authUser?.firstName || '',
        lastName: authUser?.lastName || '',
        email: authUser?.email || '',
        phone: authUser?.phone || '',
        bio: authUser?.bio || '',
        instagram: authUser?.instagram || '',
        profileImage: authUser?.profileImage || '',
        coverImage: authUser?.coverImage || '',
        photos: authUser?.photos || [],
        joinedDate: authUser?.joinedDate || new Date().toISOString(),
        location: authUser?.location || 'Colombia'
    });

    const [editData, setEditData] = useState({ ...userData });

    useEffect(() => {
        if (authUser) {
            const newData = {
                username: authUser.username,
                firstName: authUser.firstName,
                lastName: authUser.lastName,
                email: authUser.email,
                phone: authUser.phone || '',
                bio: authUser.bio || '',
                instagram: authUser.instagram || '',
                profileImage: authUser.profileImage || '',
                coverImage: authUser.coverImage || '',
                photos: authUser.photos || [],
                joinedDate: authUser.joinedDate,
                location: authUser.location || 'Colombia'
            };
            setUserData(newData);
            setEditData(newData);
        }
    }, [authUser]);

    const handleSave = () => {
        setUserData(editData);
        updateUser(editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...userData });
        setIsEditing(false);
    };

    const handleImageUpload = (type: 'profile' | 'cover' | 'gallery') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (type === 'profile') {
                    setEditData({ ...editData, profileImage: result });
                } else if (type === 'cover') {
                    setEditData({ ...editData, coverImage: result });
                } else {
                    setEditData({ ...editData, photos: [...editData.photos, result] });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = (index: number) => {
        const newPhotos = editData.photos.filter((_, i) => i !== index);
        setEditData({ ...editData, photos: newPhotos });
    };

    const handleBackToHome = () => {
        // Recargar la página para volver a la aplicación principal
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0A0A0A]">

            {/* NAVIGATION BAR */}
            <nav className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBackToHome}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full font-medium hover:scale-105 transition-transform"
                            title="Volver al inicio"
                        >
                            <FiHome size={16} />
                            <span className="hidden sm:inline">Inicio</span>
                        </button>

                        <h1 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#0D1B2A] dark:text-white">
                            COLSPOTS
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                            <FiUser size={16} className="text-zinc-600 dark:text-zinc-400" />
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                {userData.firstName} {userData.lastName}
                            </span>
                        </div>

                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:scale-105 transition-transform text-sm"
                        >
                            <FiLogOut size={16} />
                            <span className="hidden sm:inline">Cerrar sesión</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* HEADER SECTION CON IMAGEN DE PORTADA */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden group">
                {/* Cover Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                    {editData.coverImage ? (
                        <img
                            src={editData.coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover opacity-60"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center text-zinc-600">
                                <FiCamera size={48} className="mx-auto mb-2 opacity-30" />
                                <p className="text-sm opacity-50">Sin imagen de portada</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF9] dark:from-[#0A0A0A] via-transparent to-transparent" />

                {/* Edit Cover Button */}
                {isEditing && (
                    <label className="absolute top-6 right-6 px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full text-sm font-medium cursor-pointer hover:scale-105 transition-transform flex items-center gap-2">
                        <FiCamera size={16} />
                        <span className="hidden sm:inline">Cambiar portada</span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload('cover')}
                        />
                    </label>
                )}
            </div>

            {/* MAIN PROFILE CONTAINER */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-24 relative z-10">

                {/* PROFILE CARD */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-black/5 p-6 sm:p-8 mb-8">

                    <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">

                        {/* PROFILE IMAGE */}
                        <div className="relative group/avatar mx-auto md:mx-0">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-4 border-white dark:border-zinc-900 shadow-xl">
                                {editData.profileImage ? (
                                    <img
                                        src={editData.profileImage}
                                        alt={editData.firstName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl font-bold text-zinc-400">
                                        {editData.firstName[0]}{editData.lastName[0]}
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <label className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer">
                                    <FiCamera size={24} className="text-white" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload('profile')}
                                    />
                                </label>
                            )}
                        </div>

                        {/* USER INFO */}
                        <div className="flex-1 w-full">

                            {/* Name & Edit Button */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 mb-4">
                                <div className="text-center md:text-left w-full sm:w-auto">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                                        {userData.firstName} {userData.lastName}
                                    </h1>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg">
                                        @{userData.username}
                                    </p>
                                </div>

                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:scale-105 transition-transform text-sm sm:text-base"
                                    >
                                        <FiEdit2 size={16} />
                                        Editar perfil
                                    </button>
                                ) : (
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-emerald-600 text-white rounded-full font-medium hover:scale-105 transition-transform text-sm sm:text-base"
                                        >
                                            <FiSave size={16} />
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full font-medium hover:scale-105 transition-transform text-sm sm:text-base"
                                        >
                                            <FiX size={16} />
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Bio */}
                            <div className="mb-6">
                                {isEditing ? (
                                    <textarea
                                        value={editData.bio}
                                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                                        placeholder="Cuéntale al mundo sobre ti... ¿Qué te apasiona? ¿Cuál es tu estilo?"
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-zinc-700 dark:text-zinc-200 resize-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white outline-none min-h-[120px] text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
                                        {userData.bio || 'Sin descripción. Edita tu perfil para agregar una biografía.'}
                                    </p>
                                )}
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                                {/* Location */}
                                {(userData.location || isEditing) && (
                                    <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                        <FiMapPin className="flex-shrink-0" />
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.location}
                                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                                placeholder="Tu ubicación"
                                                className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg px-3 py-1.5 text-sm outline-none"
                                            />
                                        ) : (
                                            <span className="text-xs sm:text-sm">{userData.location}</span>
                                        )}
                                    </div>
                                )}

                                {/* Email */}
                                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                    <FiMail className="flex-shrink-0" />
                                    <span className="text-xs sm:text-sm truncate">{userData.email}</span>
                                </div>

                                {/* Phone */}
                                {(userData.phone || isEditing) && (
                                    <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                        <FiPhone className="flex-shrink-0" />
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.phone}
                                                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                                placeholder="Tu teléfono"
                                                className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg px-3 py-1.5 text-sm outline-none"
                                            />
                                        ) : (
                                            <span className="text-xs sm:text-sm">{userData.phone}</span>
                                        )}
                                    </div>
                                )}

                                {/* Instagram */}
                                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                    <FiInstagram className="flex-shrink-0" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.instagram}
                                            onChange={(e) => setEditData({ ...editData, instagram: e.target.value })}
                                            placeholder="Tu usuario de Instagram"
                                            className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg px-3 py-1.5 text-sm outline-none"
                                        />
                                    ) : userData.instagram ? (
                                        <a
                                            href={`https://instagram.com/${userData.instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs sm:text-sm hover:text-pink-600 transition-colors"
                                        >
                                            @{userData.instagram}
                                        </a>
                                    ) : (
                                        <span className="text-xs sm:text-sm opacity-50">No vinculado</span>
                                    )}
                                </div>

                                {/* Joined Date */}
                                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 sm:col-span-2">
                                    <FiCalendar className="flex-shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                        Miembro desde {new Date(userData.joinedDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PHOTOS GALLERY */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-black/5 p-6 sm:p-8 mb-12">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                            Mi Galería
                        </h2>

                        {isEditing && (
                            <label className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium cursor-pointer hover:scale-105 transition-transform text-sm">
                                <FiCamera size={16} />
                                <span className="hidden sm:inline">Agregar</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload('gallery')}
                                />
                            </label>
                        )}
                    </div>

                    {editData.photos.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {editData.photos.map((photo, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 group cursor-pointer"
                                    onClick={() => setSelectedPhoto(photo)}
                                >
                                    <img
                                        src={photo}
                                        alt={`Foto ${index + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />

                                    {isEditing && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removePhoto(index);
                                            }}
                                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                                        >
                                            <FiX size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 sm:py-16 text-zinc-400">
                            <FiCamera size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="text-sm sm:text-base">No tienes fotos en tu galería aún</p>
                            {isEditing && (
                                <p className="text-xs sm:text-sm mt-2">Haz clic en "Agregar" para empezar</p>
                            )}
                        </div>
                    )}
                </div>

            </div>

            {/* PHOTO MODAL */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <FiX size={24} />
                    </button>

                    <img
                        src={selectedPhoto}
                        alt="Vista ampliada"
                        className="max-w-full max-h-[90vh] object-contain rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}