"use client";

import { useHandCash } from "@/hooks/useHandCash";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes, FaUser, FaWallet, FaSearch, FaPlus } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BsLightning } from "react-icons/bs";
import WalletMenu from "../Wallet/menu";
import Image from "next/image";

interface HeaderProps {
	ubuntu?: any;
}

const Header: React.FC<HeaderProps> = ({ ubuntu }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { user: handCashUser, isConnected: handCashConnected, logout: handCashLogout } = useHandCash();
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path || pathname.startsWith(path);

	const navigation = [
		{ name: "Market", href: "/market/bsv20", icon: BsLightning },
		{ name: "Collections", href: "/collection", icon: HiSparkles },
		{ name: "Create", href: "/inscribe", icon: FaPlus },
	];

	return (
		<header className="sticky top-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-300/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-3 group">
						<div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-accent transition-all duration-300">
							<span className="text-white font-bold text-sm">1S</span>
						</div>
						<div className="hidden sm:block">
							<h1 className={`text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent ${ubuntu?.className || ''}`}>
								1Sat Market
							</h1>
							<p className="text-xs text-base-content/60 -mt-1">BSV Ordinals</p>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-1">
						{navigation.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.name}
									href={item.href}
									className={`flex items-center space-x-2 px-4 py-2 rounded-modern transition-all duration-200 ${
										isActive(item.href)
											? "bg-primary-500/10 text-primary-400 shadow-glow"
											: "text-base-content/70 hover:text-base-content hover:bg-base-200/50"
									}`}
								>
									<Icon className="w-4 h-4" />
									<span className="font-medium">{item.name}</span>
								</Link>
							);
						})}
					</nav>

					{/* Search Bar - Desktop Only */}
					<div className="hidden md:flex items-center flex-1 max-w-md mx-8">
						<div className="relative w-full">
							<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-4 h-4" />
							<input
								type="text"
								placeholder="Search collections, tokens..."
								className="w-full pl-10 pr-4 py-2 bg-base-200/50 border border-base-300/30 rounded-modern focus:outline-none focus:border-primary-400 focus:bg-base-200 transition-all duration-200"
							/>
						</div>
					</div>

					{/* User Profile & Actions */}
					<div className="flex items-center space-x-4">
						{/* Wallet Menu */}
						<div className="relative">
							<WalletMenu />
						</div>

						{/* User Profile */}
						{handCashConnected && handCashUser ? (
							<div className="relative">
								<button
									onClick={() => setIsProfileOpen(!isProfileOpen)}
									className="flex items-center space-x-3 p-2 rounded-modern hover:bg-base-200/50 transition-all duration-200 group"
								>
									<div className="relative">
										<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center shadow-modern">
											{handCashUser.avatarUrl ? (
												<Image
													src={handCashUser.avatarUrl}
													alt={handCashUser.displayName}
													width={32}
													height={32}
													className="w-8 h-8 rounded-full object-cover"
												/>
											) : (
												<FaUser className="w-4 h-4 text-white" />
											)}
										</div>
										<div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>
									</div>
									<div className="hidden sm:block text-left">
										<p className="text-sm font-medium text-base-content">@{handCashUser.handle}</p>
										<p className="text-xs text-base-content/60">{handCashUser.displayName}</p>
									</div>
								</button>

								{/* Profile Dropdown */}
								{isProfileOpen && (
									<div className="absolute right-0 mt-2 w-64 bg-base-100 border border-base-300/30 rounded-modern-lg shadow-modern-lg overflow-hidden animate-slide-up">
										<div className="p-4 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-b border-base-300/30">
											<div className="flex items-center space-x-3">
												<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
													{handCashUser.avatarUrl ? (
														<Image
															src={handCashUser.avatarUrl}
															alt={handCashUser.displayName}
															width={48}
															height={48}
															className="w-12 h-12 rounded-full object-cover"
														/>
													) : (
														<FaUser className="w-6 h-6 text-white" />
													)}
												</div>
												<div>
													<p className="font-semibold text-base-content">@{handCashUser.handle}</p>
													<p className="text-sm text-base-content/70">{handCashUser.displayName}</p>
													<div className="flex items-center space-x-1 mt-1">
														<div className="w-2 h-2 bg-success rounded-full"></div>
														<span className="text-xs text-success font-medium">Connected</span>
													</div>
												</div>
											</div>
										</div>
										<div className="p-2">
											<Link
												href={`/profile/${handCashUser.handle}`}
												className="flex items-center space-x-3 w-full p-3 text-left hover:bg-base-200/50 rounded-modern transition-colors"
												onClick={() => setIsProfileOpen(false)}
											>
												<FaUser className="w-4 h-4 text-base-content/60" />
												<span>My Profile</span>
											</Link>
											<Link
												href="/wallet"
												className="flex items-center space-x-3 w-full p-3 text-left hover:bg-base-200/50 rounded-modern transition-colors"
												onClick={() => setIsProfileOpen(false)}
											>
												<FaWallet className="w-4 h-4 text-base-content/60" />
												<span>My Wallet</span>
											</Link>
											<button
												onClick={async () => {
													await handCashLogout();
													setIsProfileOpen(false);
												}}
												className="flex items-center space-x-3 w-full p-3 text-left hover:bg-error/10 text-error rounded-modern transition-colors"
											>
												<FaTimes className="w-4 h-4" />
												<span>Disconnect</span>
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							<Link
								href="/wallet"
								className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-modern hover:shadow-glow transition-all duration-200"
							>
								<FaWallet className="w-4 h-4" />
								<span className="hidden sm:inline font-medium">Connect</span>
							</Link>
						)}

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="lg:hidden p-2 rounded-modern hover:bg-base-200/50 transition-colors"
						>
							{isMenuOpen ? (
								<FaTimes className="w-5 h-5" />
							) : (
								<FaBars className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="lg:hidden py-4 border-t border-base-300/30 animate-slide-up">
						<div className="space-y-2">
							{navigation.map((item) => {
								const Icon = item.icon;
								return (
									<Link
										key={item.name}
										href={item.href}
										className={`flex items-center space-x-3 px-4 py-3 rounded-modern transition-all duration-200 ${
											isActive(item.href)
												? "bg-primary-500/10 text-primary-400"
												: "text-base-content/70 hover:text-base-content hover:bg-base-200/50"
										}`}
										onClick={() => setIsMenuOpen(false)}
									>
										<Icon className="w-5 h-5" />
										<span className="font-medium">{item.name}</span>
									</Link>
								);
							})}
						</div>

						{/* Mobile Search */}
						<div className="mt-4 px-4">
							<div className="relative">
								<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-4 h-4" />
								<input
									type="text"
									placeholder="Search collections, tokens..."
									className="w-full pl-10 pr-4 py-3 bg-base-200/50 border border-base-300/30 rounded-modern focus:outline-none focus:border-primary-400 focus:bg-base-200 transition-all duration-200"
								/>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Click outside to close dropdowns */}
			{(isProfileOpen || isMenuOpen) && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => {
						setIsProfileOpen(false);
						setIsMenuOpen(false);
					}}
				/>
			)}
		</header>
	);
};

export default Header;
