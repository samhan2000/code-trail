const TopNav = ({ onModalClick }: { onModalClick: () => void }) => {
    return (
        <header className="border-b bg-card border-black/[.08] mb-6">
            <div className="py-4">
                <div className="flex items-center justify-between">

                    {/* Left section: Hamburger + Logo */}
                    <div className="flex items-center space-x-3">
                        {/* Hamburger menu */}
                        <button className="p-2 cursor-pointer" style={{ background: 'none' }} onClick={onModalClick}>
                            <img src="/menuicon-left.svg" className="h-10" />
                        </button>

                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-book-open h-8 w-8 text-primary"
                                aria-hidden="true"
                            >
                                <path d="M12 7v14" />
                                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                            </svg>
                            <h1 className="text-2xl font-bold">Code Trail</h1>
                        </div>
                    </div>

                    {/* Right section: Search */}
                    <div className="flex items-center space-x-3 mr-2">
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                            >
                                <path d="m21 21-4.34-4.34" />
                                <circle cx="11" cy="11" r="8" />
                            </svg>
                            <input
                                className="flex h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                placeholder="Search lessons, problems, tags..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default TopNav