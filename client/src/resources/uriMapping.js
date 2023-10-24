import { createURIMappingForAlbums } from "./mappingHelper";

// Red, Speak Now, Fearless
const oldAlbums = ["1EoDsNmgTLtmwe1BDAVxV5", "5MfAxS5zz8MlfROjGQVXhy", "2dqn5yOQWdyGwOpOIi9O4x"];
const newAlbums = ["6kZ42qRrzov54LcAk4onW9", "5AEDGbliTTfjOB8TSm1sxt", "4hDok0OAJd57SGIT8xuWJH"];

// TODO: include deluxe edition mappings
// might have to change other check
// Red, Speak Now, Fearless, Red Duluxe, Speak Now Deluxe, Fearless Platinum
// const oldAlbums = ["1EoDsNmgTLtmwe1BDAVxV5", "5MfAxS5zz8MlfROjGQVXhy", "2dqn5yOQWdyGwOpOIi9O4x", "1KlU96Hw9nlvqpBPlSqcTV", "5EpMjweRD573ASl7uNiHym", "43OpbkiiIxJO8ktIB777Nn"];
// const newAlbums = ["6kZ42qRrzov54LcAk4onW9", "5AEDGbliTTfjOB8TSm1sxt", "4hDok0OAJd57SGIT8xuWJH", "6kZ42qRrzov54LcAk4onW9", "5AEDGbliTTfjOB8TSm1sxt", "4hDok0OAJd57SGIT8xuWJH"];

// create the URI mapping constant
// const uriMapping = createURIMappingForAlbums(oldAlbums, newAlbums);
// console.log(uriMapping);

// hard coded uri mapping from console.log above
// regenerate mapping if albums change
// TODO: potentially change to search for album ids by album name instead of hard coded album ids
const uriMapping = {
    "spotify:track:786NsUYn4GGUf8AOt0SQhP": "spotify:track:6lzc0Al0zfZOIFsFvBS1ki",
    "spotify:track:0cITLOYn1Sv4q27zZPqlNK": "spotify:track:4OAuvHryIVv4kMDNSLuPt6",
    "spotify:track:5kYFVSQoPu7yRpfiHBwMUk": "spotify:track:3S7HNKPakdwNEBFIVTL6dZ",
    "spotify:track:4XMP3zVxrnr58T0tjIHvpR": "spotify:track:3nsfB1vus2qaloUdcBZvDu",
    "spotify:track:2ULNeSomDxVNmdDy8VxEBU": "spotify:track:3yII7UwgLF6K5zW3xad3MP",
    "spotify:track:5VwFkx7JOimOGTYfha5rs1": "spotify:track:2r9CbjYgFhtAmcFv1cSquB",
    "spotify:track:7AEAGTc8cReDqcbPoY9gwo": "spotify:track:5YqltLsjdqFtvqE7Nrysvs",
    "spotify:track:1qLeEu4iXEclkLwoBlMiou": "spotify:track:7eQj6r5PIdYKEIZjucBMcq",
    "spotify:track:1fGsZsIkQkOspfsT24nQP6": "spotify:track:7J4b3LVCIGO4CMBDFLPoP6",
    "spotify:track:6LKjHhOW1az75pCQ9XJJtF": "spotify:track:73qMN9bXy7MSPwwGfH3wQr",
    "spotify:track:2X2J0BhxaLTmnxO4pPUhSd": "spotify:track:4e5ayHsOLJNLTGfjau2mEw",
    "spotify:track:7MecVsMj22MneZt7kVFaCr": "spotify:track:7A2cNLRT0YJc1yjxHlKihs",
    "spotify:track:0L4YCNRfXAoTvdpWeH2RGj": "spotify:track:05GsNucq8Bngd9fnd4fRa0",
    "spotify:track:0dBW6ZsW8skfvoRfgeerBF": "spotify:track:7G0gBu6nLdhFDPRLc0HdDG",
    "spotify:track:6d9IiDcFxtFVIvt9pCqyGH": "spotify:track:3MytWN8L7shNYzGl4tAKRp",
    "spotify:track:3DrjZArsPsoqbLzUZZV1Id": "spotify:track:79uDOz0zuuWS7HWxzMmTa2",
    "spotify:track:24DefNCFiWTP8OjYWiXuYe": "spotify:track:5xXqyjLicvEpch72qEryFT",
    "spotify:track:7hZuICN5eaCuQyp443RCt6": "spotify:track:1zU8j1x3yi9xalMF96pzKp",
    "spotify:track:5yEPktRqvIhko5QFF3aBhQ": "spotify:track:30Y4CV7A6YqtQtTTo7Ue4j",
    "spotify:track:3RBluWmSoG2pGA1OePzGJI": "spotify:track:6dTA6y0C2ReQklntzZl8l3",
    "spotify:track:1wJL1A0QUHJPf2cm7tsrdw": "spotify:track:2EFZ9emtKWEglWUQGEQ3P9",
    "spotify:track:10eBRyImhfqVvkiVEGf0N0": "spotify:track:3sW3oSbzsfecv9XoUdGs7h",
    "spotify:track:2ythurkTtSiyfK7GprJoFW": "spotify:track:0NwGC0v03ysCYINtg6ns58",
    "spotify:track:5GPwN5iZ9ZMSXAkppj4Uvv": "spotify:track:12nBPF4Rh4XLFJV0YLN7uj",
    "spotify:track:28M2gifMU282QBM3fKajIS": "spotify:track:4tMzIAFTFdqGBQLdfbPces",
    "spotify:track:4h0EXpatqJImv4VRgvX6po": "spotify:track:59KOoHFcw5XfICnO57holu",
    "spotify:track:6XDBA3QWX51lDJ0oZbaJJN": "spotify:track:4hqJ4bSlYJOXb6Z4SRmzxs",
    "spotify:track:6Eu31gddWw0gOGO506pJYA": "spotify:track:77sMIMlNaSURUAXq5coCxE",
    "spotify:track:4t0OI7XrODjSkAu3bTPmWj": "spotify:track:2nqio0SfWg6gh2eCtfuMa5",
    "spotify:track:1vrd6UOGamcKNGnSHJQlSt": "spotify:track:6YvqWjhGD8mB5QXcbcUKtx",
    "spotify:track:4WXzzCof26KJLTK5kK53dS": "spotify:track:550erGcdD9n6PnwxrvYqZT",
    "spotify:track:6wn61Fzx9XMxQmieLpoIhW": "spotify:track:5YL553x8sHderRBDlm3NM3",
    "spotify:track:3GCL1PydwsLodcpv0Ll1ch": "spotify:track:1qrpoAMXodY6895hGKoUpA",
    "spotify:track:3rnI1UCyGJvUTVvT97VQr5": "spotify:track:0k0vFacOHNuArLWMiH60p7",
    "spotify:track:5P4wWhUYWM0IaVYLuZxdar": "spotify:track:22bPsP2jCgbLUvh82U0Z3M",
    "spotify:track:47HtKpfzpAt8rQjjXWotFj": "spotify:track:1msEuwSBneBKpVCZQcFTsU",
    "spotify:track:3esA216TyLHEkNiBCeCmcg": "spotify:track:6ON9UuIq49xXY9GPmHIYRp",
    "spotify:track:1yACRKAwlXWhXXFUSkvzhD": "spotify:track:3ExweHKZF9B752DPQByRVT"
}

export {uriMapping};
