export type ExpressErrorResponse = {
	status: number;
	message: string;
};

export type GamePathDetails = {
	path: string;
	platform: Platforms;
};

export type Platforms =
	| 'atari_2600'
	| 'atari_7800'
	| 'atari_jaguar'
	| 'atari_lynx'
	| 'colecovision'
	| 'channel_f'
	| 'intellivision'
	| 'neo_geo_pocket_color'
	| 'nintendo_3ds'
	| 'nintendo_64'
	| 'nintendo_ds'
	| 'nes'
	| 'nintendo_gameboy'
	| 'nintendo_gameboy_advance'
	| 'nintendo_gameboy_color'
	| 'nintendo_gamecube'
	| 'nintendo_virtual_boy'
	| 'nintendo_wii'
	| 'cdi'
	| 'sega_32x'
	| 'sega_cd'
	| 'sega_dreamcast'
	| 'sega_game_gear'
	| 'sega_genesis'
	| 'sega_master_system'
	| 'sega_saturn'
	| 'sony_playstation'
	| 'sony_playstation2'
	| 'sony_psp'
	| 'snes'
	| 'turbografx_16'
	| 'watara_supervision';

export type Platform = Record<Platforms, Platforms>;

export type PlatformExtensions = Record<Platforms, string[]>;
