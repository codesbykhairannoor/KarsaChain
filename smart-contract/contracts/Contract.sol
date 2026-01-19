// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChainVault {

    // 1. Struktur Data: Ini kayak 'blueprint' buat setiap file yang di-upload
    struct Asset {
        string cid;         // ID file dari IPFS (alamat file-nya)
        string title;       // Judul file (Lagu/Essay/Gambar)
        string assetType;   // Jenisnya: "music", "image", atau "essay"
        address owner;      // Siapa yang upload (Wallet Address)
        uint256 timestamp;  // Kapan di-upload
    }

    // 2. Database Mapping: Setiap user (address) punya daftar aset sendiri
    mapping(address => Asset[]) private userAssets;

    // 3. Event: Buat ngasih tau blockchain kalau ada yang baru upload (semacam notifikasi)
    event AssetUploaded(address indexed owner, string cid, string title, string assetType);

    // 4. Fungsi Upload: Buat nyimpen data ke blockchain
    function uploadAsset(string memory _cid, string memory _title, string memory _assetType) public {
        // Cek dulu, CID (alamat file) gak boleh kosong
        require(bytes(_cid).length > 0, "CID cannot be empty");

        // Masukin data baru ke memory
        Asset memory newAsset = Asset({
            cid: _cid,
            title: _title,
            assetType: _assetType,
            owner: msg.sender, // msg.sender itu alamat wallet yang lagi connect
            timestamp: block.timestamp
        });

        // Simpan ke database user
        userAssets[msg.sender].push(newAsset);

        // Kirim notifikasi
        emit AssetUploaded(msg.sender, _cid, _title, _assetType);
    }

    // 5. Fungsi Ambil Data: Buat nampilin semua file milik user di Website nanti
    function getUserAssets(address _user) public view returns (Asset[] memory) {
        return userAssets[_user];
    }
}