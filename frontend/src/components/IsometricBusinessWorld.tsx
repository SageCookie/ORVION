import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  Users, FileText, ShoppingCart, Warehouse, Factory,
  Truck, CreditCard, Zap, ArrowRight,
  Maximize2, RotateCcw, Play, Pause
} from 'lucide-react';

export interface DistrictInfo {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  badge: string;
  badgeColor: string;
  accentHex: number;
  accentCss: string;
  position: [number, number, number];
  icon: any;
  metric: string;
  detail: string;
  code: string;
}

export const DISTRICTS: DistrictInfo[] = [
  {
    id: 'office',
    name: 'Office & CRM Hub',
    subtitle: 'Customer Inception & Sales',
    category: 'Sales & CRM',
    badge: 'Enterprise Tier 1',
    badgeColor: 'text-sky-700 bg-sky-100 border-sky-300',
    accentHex: 0x0284c7,
    accentCss: '#0284c7',
    position: [-13, 0, -8],
    icon: Users,
    metric: '99.4% CSAT',
    detail: 'B2B Client profile verified with automated credit term approvals.',
    code: 'CUST-8041',
  },
  {
    id: 'quotation',
    name: 'Quotation Desk',
    subtitle: 'High-Precision Proposals',
    category: 'Commercial',
    badge: '1-Click Convert',
    badgeColor: 'text-indigo-700 bg-indigo-100 border-indigo-300',
    accentHex: 0x6366f1,
    accentCss: '#6366f1',
    position: [-12, 0, 8],
    icon: FileText,
    metric: 'Auto Validated',
    detail: 'Direct OpenPDF vector rendering with line-item tax & discount math.',
    code: 'QT-7701',
  },
  {
    id: 'orders',
    name: 'Order Processing Station',
    subtitle: 'Confirmed Pipeline Hub',
    category: 'Fulfillment',
    badge: 'High Priority',
    badgeColor: 'text-amber-800 bg-amber-100 border-amber-300',
    accentHex: 0xd97706,
    accentCss: '#d97706',
    position: [-2, 0, 13],
    icon: ShoppingCart,
    metric: 'Pipeline Locked',
    detail: 'Atomic conversion from quotation with guaranteed transaction integrity.',
    code: 'ORD-8942',
  },
  {
    id: 'warehouse',
    name: 'High-Bay Warehouse',
    subtitle: 'Real-Time Inventory Ledger',
    category: 'Supply Chain',
    badge: 'Stock Reserved',
    badgeColor: 'text-emerald-700 bg-emerald-100 border-emerald-300',
    accentHex: 0x059669,
    accentCss: '#059669',
    position: [11, 0, 10],
    icon: Warehouse,
    metric: '142 Units Optimal',
    detail: 'Automated bin allocation in RACK-A1 with predictive reorder safeguards.',
    code: 'RACK-A1',
  },
  {
    id: 'factory',
    name: 'Precision Assembly Plant',
    subtitle: 'Shop Floor & Quality Cert',
    category: 'Manufacturing',
    badge: '100% QC Passed',
    badgeColor: 'text-purple-700 bg-purple-100 border-purple-300',
    accentHex: 0x9333ea,
    accentCss: '#9333ea',
    position: [14, 0, -5],
    icon: Factory,
    metric: '0.01mm Tolerance',
    detail: 'Batch PO-441 produced 248/250 units with zero structural deviations.',
    code: 'PO-441',
  },
  {
    id: 'delivery',
    name: 'Logistics & Fleet Depot',
    subtitle: 'Dispatch & Waybill Tracking',
    category: 'Logistics',
    badge: 'Dispatched',
    badgeColor: 'text-teal-700 bg-teal-100 border-teal-300',
    accentHex: 0x0d9488,
    accentCss: '#0d9488',
    position: [4, 0, -14],
    icon: Truck,
    metric: 'ETA 16:30 Today',
    detail: 'Direct courier handoff with real-time route waybill tracking.',
    code: 'TRK-88219',
  },
  {
    id: 'finance',
    name: 'Finance & Banking Vault',
    subtitle: 'Settlement & Audit Ledger',
    category: 'Treasury',
    badge: '100% Settled',
    badgeColor: 'text-emerald-800 bg-emerald-100 border-emerald-300',
    accentHex: 0x16a34a,
    accentCss: '#16a34a',
    position: [-5, 0, -14],
    icon: CreditCard,
    metric: 'BigDecimal Exact',
    detail: 'Scale=2 rounding mode HALF_UP eliminating all floating-point drift.',
    code: 'INV-9021',
  },
  {
    id: 'core',
    name: 'ORVION Central Command Core',
    subtitle: 'Digital Operations Orchestrator',
    category: 'Intelligence Core',
    badge: '60fps Synchronized',
    badgeColor: 'text-sky-800 bg-sky-100 border-sky-300',
    accentHex: 0x0284c7,
    accentCss: '#0284c7',
    position: [0, 0, 0],
    icon: Zap,
    metric: '99.98% Uptime',
    detail: 'Authoritative Spring Boot 3 & Java 21 LTS domain-driven modular monolith.',
    code: 'SYS-CORE',
  },
];

interface Props {
  activeDistrictId?: string;
  onDistrictSelect?: (district: DistrictInfo) => void;
  className?: string;
}

export default function IsometricBusinessWorld({
  activeDistrictId,
  onDistrictSelect,
  className = '',
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictInfo | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo>(DISTRICTS[7]); // Default Core
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [isInteractive, setIsInteractive] = useState(false);

  // Mutable refs to prevent WebGL teardown/recreation on hover, select, or orbit toggle
  const isAutoOrbitRef = useRef(isAutoOrbit);
  useEffect(() => {
    isAutoOrbitRef.current = isAutoOrbit;
  }, [isAutoOrbit]);

  const isInteractiveRef = useRef(isInteractive);
  useEffect(() => {
    isInteractiveRef.current = isInteractive;
  }, [isInteractive]);

  const selectedDistrictRef = useRef(selectedDistrict);
  useEffect(() => {
    selectedDistrictRef.current = selectedDistrict;
  }, [selectedDistrict]);

  const hoveredDistrictRef = useRef<DistrictInfo | null>(null);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const districtMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(38, 30, 38));
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(38, 30, 38));
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));
  const orbitAngleRef = useRef<number>(Math.PI / 4);

  // Sync external activeDistrictId
  useEffect(() => {
    if (activeDistrictId) {
      const found = DISTRICTS.find((d) => d.id === activeDistrictId);
      if (found) {
        setSelectedDistrict(found);
      }
    }
  }, [activeDistrictId]);

  const selectDistrict = useCallback(
    (district: DistrictInfo) => {
      setSelectedDistrict(district);
      if (onDistrictSelect) {
        onDistrictSelect(district);
      }

      // Smooth camera reframing
      if (district.id === 'core') {
        cameraTargetRef.current.set(0, 0, 0);
        targetCameraPosRef.current.set(38, 30, 38);
      } else {
        const [dx, , dz] = district.position;
        cameraTargetRef.current.set(dx * 0.7, 1.5, dz * 0.7);
        targetCameraPosRef.current.set(dx + 28, 24, dz + 28);
      }
    },
    [onDistrictSelect]
  );

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 1000;
    let height = container.clientHeight || 650;

    // 1. SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // Transparent to showcase luminous backdrop

    // 2. CAMERA (Low-FOV Isometric Axonometric Perspective)
    const camera = new THREE.PerspectiveCamera(28, width / height, 1, 1000);
    camera.position.set(38, 30, 38);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. RENDERER (Optimized pixelRatio and shadow map for 60fps smooth scrolling)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. ARCHITECTURAL LIGHTING (Refined daylight architectural key & ambient fill)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcfd8dc, 1.4);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    // Warm Sun Key Light (Optimized shadow map for silky smooth 60fps rendering)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(35, 55, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 150;
    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Soft Cyan Fill Light
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    fillLight.position.set(-30, 25, -25);
    scene.add(fillLight);

    // Soft Violet Accent Rim
    const rimLight = new THREE.DirectionalLight(0x818cf8, 0.6);
    rimLight.position.set(20, 15, -35);
    scene.add(rimLight);

    // 5. MASTER BASE PLATFORM (Porous Architectural Matte Ground with Grid)
    const baseGroup = new THREE.Group();
    scene.add(baseGroup);

    // Ground Island Slab (Light Architectural Titanium)
    const groundGeo = new THREE.CylinderGeometry(28, 29.5, 1.2, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.88,
      metalness: 0.05,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.y = -0.6;
    groundMesh.receiveShadow = true;
    baseGroup.add(groundMesh);

    // Upper Frosted Rim Ring
    const ringGeo = new THREE.TorusGeometry(28, 0.25, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.02;
    baseGroup.add(ringMesh);

    // Subtle Architectural Floor Grid
    const gridHelper = new THREE.GridHelper(52, 26, 0x94a3b8, 0xcfd8dc);
    gridHelper.position.y = 0.01;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    (gridHelper.material as THREE.Material).transparent = true;
    baseGroup.add(gridHelper);

    // 6. BUILD THE 8 ARCHITECTURAL DISTRICTS
    const districtGroups = new Map<string, THREE.Group>();

    DISTRICTS.forEach((district) => {
      const group = new THREE.Group();
      group.position.set(...district.position);
      group.name = district.id;

      // Base Pedestal for each building
      const pedestalGeo = new THREE.CylinderGeometry(3.6, 4.0, 0.4, 24);
      const pedestalMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.6,
        metalness: 0.1,
      });
      const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
      pedestal.position.y = 0.2;
      pedestal.receiveShadow = true;
      group.add(pedestal);

      // Glowing Base Accent Ring
      const accentRingGeo = new THREE.TorusGeometry(3.6, 0.12, 12, 32);
      const accentRingMat = new THREE.MeshStandardMaterial({
        color: district.accentHex,
        emissive: district.accentHex,
        emissiveIntensity: 0.8,
        roughness: 0.3,
      });
      const accentRing = new THREE.Mesh(accentRingGeo, accentRingMat);
      accentRing.rotation.x = Math.PI / 2;
      accentRing.position.y = 0.41;
      group.add(accentRing);

      // District-Specific Architectural Form
      switch (district.id) {
        case 'core': {
          // Tiered central digital command core
          const coreBaseGeo = new THREE.CylinderGeometry(2.4, 2.8, 1.4, 6);
          const coreBaseMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            metalness: 0.8,
            roughness: 0.2,
          });
          const coreBase = new THREE.Mesh(coreBaseGeo, coreBaseMat);
          coreBase.position.y = 1.1;
          coreBase.castShadow = true;
          group.add(coreBase);

          // Levitating Octahedron Hologram
          const prismGeo = new THREE.OctahedronGeometry(1.6, 0);
          const prismMat = new THREE.MeshStandardMaterial({
            color: 0x00f2fe,
            emissive: 0x00f2fe,
            emissiveIntensity: 0.9,
            metalness: 0.5,
            roughness: 0.1,
            transparent: true,
            opacity: 0.88,
          });
          const prism = new THREE.Mesh(prismGeo, prismMat);
          prism.position.y = 3.6;
          prism.name = 'levitatingPrism';
          prism.castShadow = true;
          group.add(prism);

          // Orbiting Laser Torus
          const coreRingGeo = new THREE.TorusGeometry(2.8, 0.08, 16, 48);
          const coreRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
          const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
          coreRing.rotation.x = Math.PI / 3;
          coreRing.position.y = 3.6;
          coreRing.name = 'orbitRing';
          group.add(coreRing);
          break;
        }

        case 'office': {
          // Multi-story glazed office tower
          const towerGeo = new THREE.BoxGeometry(3.2, 5.2, 3.2);
          const towerMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.3,
            metalness: 0.6,
          });
          const tower = new THREE.Mesh(towerGeo, towerMat);
          tower.position.y = 3.0;
          tower.castShadow = true;
          group.add(tower);

          // Glass Window Façade Layer
          const glassGeo = new THREE.BoxGeometry(3.26, 4.4, 3.26);
          const glassMat = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            roughness: 0.1,
            metalness: 0.9,
            transparent: true,
            opacity: 0.35,
          });
          const glass = new THREE.Mesh(glassGeo, glassMat);
          glass.position.y = 3.0;
          group.add(glass);

          // Rooftop Spire / Antenna
          const spireGeo = new THREE.CylinderGeometry(0.08, 0.15, 1.8, 8);
          const spireMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
          const spire = new THREE.Mesh(spireGeo, spireMat);
          spire.position.y = 6.4;
          group.add(spire);
          break;
        }

        case 'quotation': {
          // Architectural cantilevered design studio
          const qMainGeo = new THREE.BoxGeometry(4.2, 2.6, 2.6);
          const qMainMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.4,
            metalness: 0.5,
          });
          const qMain = new THREE.Mesh(qMainGeo, qMainMat);
          qMain.position.y = 1.7;
          qMain.castShadow = true;
          group.add(qMain);

          // Cantilevered Upper Studio
          const qTopGeo = new THREE.BoxGeometry(2.8, 1.6, 3.4);
          const qTopMat = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            roughness: 0.2,
            metalness: 0.6,
            transparent: true,
            opacity: 0.9,
          });
          const qTop = new THREE.Mesh(qTopGeo, qTopMat);
          qTop.position.set(-0.6, 3.4, 0.2);
          qTop.castShadow = true;
          group.add(qTop);
          break;
        }

        case 'orders': {
          // Automated intake and processing hub
          const oBaseGeo = new THREE.CylinderGeometry(2.6, 3.0, 2.0, 16);
          const oBaseMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.5,
            metalness: 0.4,
          });
          const oBase = new THREE.Mesh(oBaseGeo, oBaseMat);
          oBase.position.y = 1.4;
          oBase.castShadow = true;
          group.add(oBase);

          // Glowing Intake Funnel Ring
          const oRingGeo = new THREE.TorusGeometry(1.6, 0.2, 16, 32);
          const oRingMat = new THREE.MeshStandardMaterial({
            color: 0xd97706,
            emissive: 0xd97706,
            emissiveIntensity: 0.9,
          });
          const oRing = new THREE.Mesh(oRingGeo, oRingMat);
          oRing.rotation.x = Math.PI / 2;
          oRing.position.y = 2.6;
          group.add(oRing);

          // Ramp / Queue Rails
          const rampGeo = new THREE.BoxGeometry(0.5, 0.15, 3.2);
          const rampMat = new THREE.MeshStandardMaterial({ color: 0x64748b });
          const ramp = new THREE.Mesh(rampGeo, rampMat);
          ramp.position.set(1.5, 1.2, 1.2);
          ramp.rotation.x = Math.PI / 6;
          group.add(ramp);
          break;
        }

        case 'warehouse': {
          // High-bay distribution center with vaulted gables
          const wMainGeo = new THREE.BoxGeometry(5.2, 3.2, 3.6);
          const wMainMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.6,
            metalness: 0.3,
          });
          const wMain = new THREE.Mesh(wMainGeo, wMainMat);
          wMain.position.y = 2.0;
          wMain.castShadow = true;
          group.add(wMain);

          // Roof Gables
          const wRoofGeo = new THREE.ConeGeometry(3.6, 1.4, 4);
          const wRoofMat = new THREE.MeshStandardMaterial({
            color: 0x059669,
            metalness: 0.4,
            roughness: 0.5,
          });
          const wRoof = new THREE.Mesh(wRoofGeo, wRoofMat);
          wRoof.position.y = 4.2;
          wRoof.rotation.y = Math.PI / 4;
          wRoof.castShadow = true;
          group.add(wRoof);

          // Loading Dock Bays
          for (let b = -1; b <= 1; b++) {
            const dockGeo = new THREE.BoxGeometry(0.8, 1.1, 0.2);
            const dockMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
            const dock = new THREE.Mesh(dockGeo, dockMat);
            dock.position.set(b * 1.4, 0.9, 1.82);
            group.add(dock);
          }
          break;
        }

        case 'factory': {
          // Precision manufacturing shed with stacks
          const fMainGeo = new THREE.BoxGeometry(4.4, 2.8, 4.0);
          const fMainMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.5,
            metalness: 0.5,
          });
          const fMain = new THREE.Mesh(fMainGeo, fMainMat);
          fMain.position.y = 1.8;
          fMain.castShadow = true;
          group.add(fMain);

          // Triple Exhaust Stacks
          for (let s = -1; s <= 1; s++) {
            const stackGeo = new THREE.CylinderGeometry(0.24, 0.28, 2.6, 12);
            const stackMat = new THREE.MeshStandardMaterial({
              color: 0x9333ea,
              metalness: 0.7,
              roughness: 0.3,
            });
            const stack = new THREE.Mesh(stackGeo, stackMat);
            stack.position.set(s * 0.9, 4.1, -0.6);
            stack.castShadow = true;
            group.add(stack);
          }
          break;
        }

        case 'delivery': {
          // Logistics terminal with dispatch vehicle
          const dTermGeo = new THREE.BoxGeometry(4.0, 1.8, 2.4);
          const dTermMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.4,
            metalness: 0.4,
          });
          const dTerm = new THREE.Mesh(dTermGeo, dTermMat);
          dTerm.position.y = 1.3;
          dTerm.castShadow = true;
          group.add(dTerm);

          // Delivery Truck Chassis
          const truckGeo = new THREE.BoxGeometry(1.4, 0.9, 2.4);
          const truckMat = new THREE.MeshStandardMaterial({
            color: 0x0d9488,
            metalness: 0.6,
            roughness: 0.3,
          });
          const truck = new THREE.Mesh(truckGeo, truckMat);
          truck.position.set(1.4, 0.85, 1.4);
          truck.castShadow = true;
          group.add(truck);
          break;
        }

        case 'finance': {
          // Tiered treasury bank vault
          const vaultGeo = new THREE.CylinderGeometry(2.0, 2.6, 3.2, 8);
          const vaultMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            metalness: 0.8,
            roughness: 0.2,
          });
          const vault = new THREE.Mesh(vaultGeo, vaultMat);
          vault.position.y = 2.0;
          vault.castShadow = true;
          group.add(vault);

          // Golden/Emerald Dome
          const domeGeo = new THREE.SphereGeometry(1.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
          const domeMat = new THREE.MeshStandardMaterial({
            color: 0x16a34a,
            emissive: 0x16a34a,
            emissiveIntensity: 0.6,
            metalness: 0.9,
            roughness: 0.1,
          });
          const dome = new THREE.Mesh(domeGeo, domeMat);
          dome.position.y = 3.6;
          group.add(dome);
          break;
        }
      }

      baseGroup.add(group);
      districtGroups.set(district.id, group);
      districtMeshesRef.current.set(district.id, group);
    });

    // 7. SUBTERRANEAN NEON DATA PIPELINES (Continuous Business Flow)
    const conduitCurvePoints = [
      new THREE.Vector3(-13, 0.4, -8), // Office CRM
      new THREE.Vector3(-12, 0.4, 8),  // Quotation
      new THREE.Vector3(-2, 0.4, 13),  // Orders
      new THREE.Vector3(11, 0.4, 10),  // Warehouse
      new THREE.Vector3(14, 0.4, -5),  // Factory
      new THREE.Vector3(4, 0.4, -14),  // Delivery
      new THREE.Vector3(-5, 0.4, -14), // Finance
      new THREE.Vector3(-13, 0.4, -8), // Loop back
    ];

    const splineCurve = new THREE.CatmullRomCurve3(conduitCurvePoints, true, 'catmullrom', 0.15);
    const tubeGeo = new THREE.TubeGeometry(splineCurve, 120, 0.14, 8, true);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tubeMesh);

    // Glowing Particle Packets traveling along conduits
    const particleCount = 8;
    const particlesGroup = new THREE.Group();
    scene.add(particlesGroup);

    const pGeo = new THREE.SphereGeometry(0.32, 12, 12);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const packetMeshes: THREE.Mesh[] = [];

    for (let p = 0; p < particleCount; p++) {
      const mesh = new THREE.Mesh(pGeo, pMat);
      particlesGroup.add(mesh);
      packetMeshes.push(mesh);
    }

    // 8. INTERACTIVE MOUSE EVENT LISTENERS (Optimized & Throttled)
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Only perform raycasting on pointer movement over canvas, not in animation loop
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children, true);

      let found: DistrictInfo | null = null;
      if (intersects.length > 0) {
        let curr: THREE.Object3D | null = intersects[0].object;
        while (curr && curr.parent && curr.parent !== scene) {
          curr = curr.parent;
        }
        if (curr && curr.name) {
          found = DISTRICTS.find((d) => d.id === curr?.name) || null;
        }
      }

      if (found?.id !== hoveredDistrictRef.current?.id) {
        hoveredDistrictRef.current = found;
        setHoveredDistrict(found);
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.set(-999, -999);
      if (hoveredDistrictRef.current !== null) {
        hoveredDistrictRef.current = null;
        setHoveredDistrict(null);
      }
    };

    const handleClick = () => {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let curr: THREE.Object3D | null = intersects[0].object;
        while (curr && curr.parent && curr.parent !== scene) {
          curr = curr.parent;
        }

        if (curr && curr.name) {
          const matched = DISTRICTS.find((d) => d.id === curr?.name);
          if (matched) {
            selectDistrict(matched);
          }
        }
      }
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 9. ANIMATION LOOP with IntersectionObserver Pausing (Zero Stutter on Page Scroll)
    let isVisible = true;
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      if (!isVisible) return; // Completely pause Three.js rendering when scrolled past!
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera orbital rotation when idle
      if (isAutoOrbitRef.current && !isInteractiveRef.current) {
        orbitAngleRef.current += delta * 0.08;
        const radius = 52;
        targetCameraPosRef.current.x = Math.cos(orbitAngleRef.current) * radius;
        targetCameraPosRef.current.z = Math.sin(orbitAngleRef.current) * radius;
        targetCameraPosRef.current.y = 32 + Math.sin(elapsed * 0.5) * 2.5;
      }

      // Smooth camera lerping towards target
      currentCameraPosRef.current.lerp(targetCameraPosRef.current, 0.05);
      camera.position.copy(currentCameraPosRef.current);
      camera.lookAt(cameraTargetRef.current);

      // Rotate levitating core hologram
      const coreGroup = districtGroups.get('core');
      if (coreGroup) {
        const prism = coreGroup.getObjectByName('levitatingPrism');
        if (prism) {
          prism.rotation.y += delta * 0.8;
          prism.rotation.x = Math.sin(elapsed * 1.5) * 0.2;
          prism.position.y = 3.6 + Math.sin(elapsed * 2.0) * 0.25;
        }

        const ring = coreGroup.getObjectByName('orbitRing');
        if (ring) {
          ring.rotation.z += delta * 0.5;
        }
      }

      // Animate flowing packet pulses along conduit spline
      packetMeshes.forEach((packet, idx) => {
        const progress = (elapsed * 0.12 + idx / particleCount) % 1.0;
        const point = splineCurve.getPointAt(progress);
        packet.position.copy(point);
      });

      // Elevate hovered or active district smoothly without React re-rendering
      const activeSel = selectedDistrictRef.current;
      const activeHov = hoveredDistrictRef.current;
      districtGroups.forEach((grp, id) => {
        const isTarget =
          (activeHov && activeHov.id === id) || (activeSel && activeSel.id === id);
        const targetY = isTarget ? 0.6 : 0.0;
        grp.position.y = THREE.MathUtils.lerp(grp.position.y, targetY, 0.1);
      });

      renderer.render(scene, camera);
    };

    // Pause when off-screen to free GPU/CPU for scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          clock.start();
          animate();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('click', handleClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectDistrict]);

  return (
    <div
      className={`relative w-full h-[620px] lg:h-[720px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/90 via-slate-50/80 to-white/90 border border-slate-200/90 shadow-[0_16px_50px_rgba(15,23,42,0.06)] select-none ${className}`}
      onMouseEnter={() => setIsInteractive(true)}
      onMouseLeave={() => setIsInteractive(false)}
    >
      {/* Three.js WebGL Mount Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Environment Header & Controls */}
      <div className="absolute top-5 left-6 z-20 flex items-center gap-3">
        <div className="px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-slate-200/90 text-xs text-slate-700 flex items-center gap-2 shadow-md">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
          <span className="font-extrabold tracking-wider text-slate-900">ORVION 3D ECOSYSTEM</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 text-[11px] font-medium">Miniature Business World</span>
        </div>

        <button
          onClick={() => setIsAutoOrbit(!isAutoOrbit)}
          className={`p-2 rounded-xl backdrop-blur-xl border text-xs transition-all ${
            isAutoOrbit
              ? 'bg-sky-50 border-sky-300 text-sky-700 shadow-sm'
              : 'bg-white/80 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title={isAutoOrbit ? 'Pause Orbit' : 'Resume Auto Orbit'}
        >
          {isAutoOrbit ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => selectDistrict(DISTRICTS[7])}
          className="p-2 rounded-xl bg-white/80 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-all text-xs shadow-sm"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top Right Live Focus Detail Badge */}
      <div className="absolute top-5 right-6 z-20 hidden md:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-lg max-w-sm animate-in fade-in duration-300">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${selectedDistrict.accentCss}18` }}
        >
          <selectedDistrict.icon className="w-4 h-4" style={{ color: selectedDistrict.accentCss }} />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
            <span>{selectedDistrict.name}</span>
            <span className="text-[10px] font-mono text-slate-500">[{selectedDistrict.code}]</span>
          </div>
          <div className="text-[10px] text-slate-600 truncate">{selectedDistrict.metric}</div>
        </div>
      </div>

      {/* Floating Interactive Glass Card on Hover or Select (Refined Glassmorphic Panel) */}
      {(hoveredDistrict || selectedDistrict) && (
        <div
          className="absolute bottom-20 left-6 z-20 max-w-sm p-4 rounded-2xl backdrop-blur-3xl bg-white/95 border border-slate-200 shadow-[0_12px_40px_rgba(15,23,42,0.12)] animate-in fade-in slide-in-from-bottom-3 duration-200"
          style={{
            borderColor: (hoveredDistrict || selectedDistrict).accentCss,
            boxShadow: `0 8px 30px ${(hoveredDistrict || selectedDistrict).accentCss}22`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: (hoveredDistrict || selectedDistrict).accentCss }}
              />
              <span className="text-xs font-extrabold text-slate-900">
                {(hoveredDistrict || selectedDistrict).name}
              </span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                (hoveredDistrict || selectedDistrict).badgeColor
              }`}
            >
              {(hoveredDistrict || selectedDistrict).badge}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {(hoveredDistrict || selectedDistrict).detail}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500 font-mono">
              Status: <span className="text-emerald-600 font-bold">100% Operational</span>
            </span>
            <button
              onClick={() => selectDistrict(hoveredDistrict || selectedDistrict)}
              className="text-sky-600 font-bold flex items-center gap-1 hover:underline"
            >
              <span>Focus Module</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating District Selector Stepper */}
      <div className="absolute bottom-5 inset-x-6 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-xl overflow-x-auto max-w-full">
          {DISTRICTS.map((d) => (
            <button
              key={d.id}
              onClick={() => selectDistrict(d)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDistrict.id === d.id
                  ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <d.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{d.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/85 backdrop-blur-xl border border-slate-200/90 text-slate-600 text-xs shadow-sm">
          <Maximize2 className="w-3.5 h-3.5 text-sky-600" />
          <span>Click any 3D district to glide camera</span>
        </div>
      </div>
    </div>
  );
}
