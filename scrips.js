// =======================================================
// Data Operator Logika Proposisional
// =======================================================

const OPERATORS = [
    {
        id: 'negasi',
        nama: '1. Negasi (Negation)',
        simbol: '$\\neg p$',
        deskripsi: 'Membalik nilai kebenaran. Hanya membutuhkan satu proposisi.',
        kalkulasi: (p, q) => !p,
        header: ['p', '$\\neg p$'],
        inputs: [[true], [false]]
    },
    {
        id: 'konjungsi',
        nama: '2. Konjungsi (Conjunction)',
        simbol: '$p \\land q$',
        deskripsi: 'Hanya **Benar** jika **kedua** proposisi Benar.',
        kalkulasi: (p, q) => p && q,
        header: ['p', 'q', '$p \\land q$'],
        inputs: [[true, true], [true, false], [false, true], [false, false]]
    },
    {
        id: 'disjungsi-inklusif',
        nama: '3. Disjungsi Inklusif (Inclusive Disjunction)',
        simbol: '$p \\lor q$',
        deskripsi: 'Benar jika **setidaknya satu** proposisi Benar (termasuk keduanya).',
        kalkulasi: (p, q) => p || q,
        header: ['p', 'q', '$p \\lor q$'],
        inputs: [[true, true], [true, false], [false, true], [false, false]]
    },
    {
        id: 'disjungsi-eksklusif',
        nama: '4. Disjungsi Eksklusif (Exclusive Disjunction / XOR)',
        simbol: '$p \\oplus q$',
        deskripsi: 'Benar jika **tepat satu** proposisi Benar.',
        kalkulasi: (p, q) => p !== q,
        header: ['p', 'q', '$p \\oplus q$'],
        inputs: [[true, true], [true, false], [false, true], [false, false]]
    },
    {
        id: 'implikasi',
        nama: '5. Implikasi (Conditional)',
        simbol: '$p \\to q$',
        deskripsi: 'Hanya **Salah** jika sebab ($p$) Benar dan akibat ($q$) Salah.',
        kalkulasi: (p, q) => !p || q,
        header: ['p', 'q', '$p \\to q$'],
        inputs: [[true, true], [true, false], [false, true], [false, false]]
    },
    {
        id: 'biimplikasi',
        nama: '6. Biimplikasi (Biconditional)',
        simbol: '$p \\leftrightarrow q$',
        deskripsi: 'Benar jika $p$ dan $q$ memiliki **nilai kebenaran yang sama**.',
        kalkulasi: (p, q) => p === q,
        header: ['p', 'q', '$p \\leftrightarrow q$'],
        inputs: [[true, true], [true, false], [false, true], [false, false]]
    }
];

// Fungsi Pembantu
const toStr = (val) => val ? 'T' : 'F'; // Mengubah Boolean ke String 'T'/'F'

function generateTruthTable(operator) {
    let tableHTML = '<table class="truth-table">';
    tableHTML += '<thead><tr>';
    operator.header.forEach(h => {
        tableHTML += `<th>${h}</th>`;
    });
    tableHTML += '</tr></thead>';

    tableHTML += '<tbody>';
    operator.inputs.forEach(input => {
        const p = input[0];
        const q = input.length > 1 ? input[1] : null;
        const result = operator.kalkulasi(p, q);

        tableHTML += '<tr>';
        tableHTML += `<td>${toStr(p)}</td>`;
        
        if (q !== null) {
            tableHTML += `<td>${toStr(q)}</td>`;
        }
        
        tableHTML += `<td>${toStr(result)}</td>`;
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';
    
    return tableHTML;
}

// =======================================================
// Studi Kasus Logika (Sistem Persyaratan Kursus)
// =======================================================

function cekMatematikaDiskritLanjutan(p, c) {
    return p && c; 
}

function cekStrukturData(d, a) {
    return d || a; 
}

const getStatusHTML = (isEligible) => isEligible ? 
    `<span class="status-ok">✅ MEMENUHI SYARAT (T)</span>` : 
    `<span class="status-fail">❌ BELUM MEMENUHI SYARAT (F)</span>`;

const mahasiswa1 = {
    nama: "Budi",
    P: true, // Lulus Logika
    C: false, // Lulus Kalkulus
    D: true, // Lulus Pemrograman Dasar
    A: false // Lulus Algoritma
};

function generateDecisionSystemHTML() {
    const L_eligible = cekMatematikaDiskritLanjutan(mahasiswa1.P, mahasiswa1.C);
    const S_eligible = cekStrukturData(mahasiswa1.D, mahasiswa1.A);

    let html = `
        <h2>7. Studi Kasus: Sistem Persyaratan Kursus</h2>
        <p><strong>Masalah:</strong> Menentukan kelayakan mahasiswa mengambil kursus lanjutan menggunakan Logika Proposisional.</p>
        
        <h3>Kasus Mahasiswa: ${mahasiswa1.nama}</h3>
        <ul>
            <li>Lulus Logika (P): ${toStr(mahasiswa1.P)}</li>
            <li>Lulus Kalkulus (C): ${toStr(mahasiswa1.C)}</li>
            <li>Lulus Pemrograman Dasar (D): ${toStr(mahasiswa1.D)}</li>
            <li>Lulus Algoritma (A): ${toStr(mahasiswa1.A)}</li>
        </ul>

        <h4>Keputusan Logika:</h4>
        
        <p><strong>Matematika Diskrit Lanjutan (L):</strong> Persyaratan: Lulus (P) $\\land$ Lulus (C)</p>
        <p>Hasil Perhitungan: ${toStr(mahasiswa1.P)} $\\land$ ${toStr(mahasiswa1.C)} $\\implies$ **${toStr(L_eligible)}**</p>
        <p>Status: ${getStatusHTML(L_eligible)}</p>
        
        <hr style="border-color: #555;">

        <p><strong>Struktur Data (S):</strong> Persyaratan: Lulus (D) $\\lor$ Lulus (A)</p>
        <p>Hasil Perhitungan: ${toStr(mahasiswa1.D)} $\\lor$ ${toStr(mahasiswa1.A)} $\\implies$ **${toStr(S_eligible)}**</p>
        <p>Status: ${getStatusHTML(S_eligible)}</p>
    `;
    return html;
}

// =======================================================
// Fungsi Utama (DOM Loader)
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Semua Operator Logika
    OPERATORS.forEach(op => {
        const container = document.getElementById(op.id);
        
        if (container) {
            container.innerHTML = `
                <h2>${op.nama}</h2>
                <p><strong>Notasi:</strong> ${op.simbol}</p>
                <p><strong>Definisi:</strong> ${op.deskripsi}</p>
                ${generateTruthTable(op)}
            `;
        }
    });

    // 2. Render Studi Kasus
    const decisionContainer = document.getElementById('decision-system');
    if (decisionContainer) {
        decisionContainer.innerHTML = generateDecisionSystemHTML();
    }

    // 3. Render MathJax
    if (window.MathJax) {
        window.MathJax.typeset();
    }
});
