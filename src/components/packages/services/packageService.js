import { packages } from '../../../data/packages.js';

class PackageService {
  getAllPackages() {
    return packages;
  }
}

export const packageService = new PackageService();

