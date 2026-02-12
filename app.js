```javascript
// 数据存储
let currentUser = null; // 当前登录用户
let users = []; // 用户列表
let customers = [];
let interactions = [];
let opportunities = [];
let currentEditId = null;
let currentEditType = null; // 'customer' or 'opportunity'

// 公司邮箱域名配置
const COMPANY_EMAIL_DOMAIN = '@fengfancloud.com';

// 初始化示例数据
function initializeData() {
    // 初始化用户数据
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    } else {
        // 创建默认管理员账号
        users = [
            {
                id: 1,
                name: '系统管理员',
                email: 'admin@fengfancloud.com',
                password: 'admin123',
                role: 'admin', // admin 或 user
                createdAt: '2026-01-01'
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // 检查登录状态
    const savedCurrentUser = localStorage.getItem('currentUser');
    if (savedCurrentUser) {
        currentUser = JSON.parse(savedCurrentUser);
        showMainSystem();
    } else {
        showAuthPage();
        return;
    }
    
    const savedCustomers = localStorage.getItem('customers');
    const savedInteractions = localStorage.getItem('interactions');
    const savedOpportunities = localStorage.getItem('opportunities');
    
    if (savedCustomers) {
        customers = JSON.parse(savedCustomers);
    } else {
        customers = [
            {
                id: 1,
                name: '张明',
                company: '科技创新有限公司',
                email: 'zhangming@tech.com',
                phone: '13800138001',
                source: '网站',
                status: 'active',
                salesOwners: '王经理、李主管',
                interestedProducts: '企业管理软件, CRM系统',
                notes: '重要客户,对产品很感兴趣',
                createdAt: '2026-01-15',
                value: 150000,
                createdBy: 1 // 创建者用户ID
            },
            {
                id: 2,
                name: '李娜',
                company: '华夏贸易集团',
                email: 'lina@huaxia.com',
                phone: '13800138002',
                source: '推荐',
                status: 'active',
                salesOwners: '张总监',
                interestedProducts: 'CRM系统定制, 数据分析平台',
                notes: '通过老客户介绍',
                createdAt: '2026-01-20',
                value: 280000,
                createdBy: 1
            },
            {
                id: 3,
                name: '王强',
                company: '未来科技',
                email: 'wangqiang@future.com',
                phone: '13800138003',
                source: '广告',
                status: 'potential',
                salesOwners: '李主管、赵专员',
                interestedProducts: '移动应用开发',
                notes: '正在评估中',
                createdAt: '2026-01-25',
                value: 0,
                createdBy: 1
            },
            {
                id: 4,
                name: '赵雪',
                company: '智能制造',
                email: 'zhaoxue@smart.com',
                phone: '13800138004',
                source: '展会',
                status: 'active',
                salesOwners: '王经理、张总监、陈专员',
                interestedProducts: '数据分析平台, 智能监控系统',
                notes: '在展会上建立联系',
                createdAt: '2026-01-10',
                value: 320000,
                createdBy: 1
            },
            {
                id: 5,
                name: '刘洋',
                company: '数字营销',
                email: 'liuyang@digital.com',
                phone: '13800138005',
                source: '网站',
                status: 'inactive',
                salesOwners: '陈专员',
                interestedProducts: '营销自动化工具',
                notes: '已有3个月未联系',
                createdAt: '2025-10-15',
                value: 50000,
                createdBy: 1
            }
        ];
        saveData();
    }
    
    if (savedInteractions) {
        interactions = JSON.parse(savedInteractions);
    } else {
        interactions = [
            {
                id: 1,
                customerId: 1,
                customerName: '张明',
                type: '电话',
                content: '讨论了产品功能和定价方案，客户表示满意',
                date: '2026-02-01'
            },
            {
                id: 2,
                customerId: 2,
                customerName: '李娜',
                type: '会议',
                content: '签订了合作协议，确定了项目时间表',
                date: '2026-01-30'
            },
            {
                id: 3,
                customerId: 1,
                customerName: '张明',
                type: '邮件',
                content: '发送了产品演示视频和技术文档',
                date: '2026-01-28'
            },
            {
                id: 4,
                customerId: 4,
                customerName: '赵雪',
                type: '拜访',
                content: '上门拜访，参观了客户工厂，了解具体需求',
                date: '2026-01-25'
            }
        ];
        saveData();
    }
    
    if (savedOpportunities) {
        opportunities = JSON.parse(savedOpportunities);
    } else {
        opportunities = [
            {
                id: 1,
                customerName: '张明',
                company: '科技创新有限公司',
                email: 'zhangming@tech.com',
                phone: '13800138001',
                product: '企业管理软件',
                originalPrice: 180000,
                discount: 16.67,
                amount: 150000,
                isDelivered: true,
                deliveryPeriod: 30,
                paymentPeriod: 60,
                notes: '项目已顺利交付，客户满意度高',
                createdAt: '2026-01-15'
            },
            {
                id: 2,
                customerName: '李娜',
                company: '华夏贸易集团',
                email: 'lina@huaxia.com',
                phone: '13800138002',
                product: 'CRM系统定制',
                originalPrice: 350000,
                discount: 20,
                amount: 280000,
                isDelivered: false,
                deliveryPeriod: 45,
                paymentPeriod: 90,
                notes: '正在开发阶段，预计下月交付',
                createdAt: '2026-01-20'
            },
            {
                id: 3,
                customerName: '赵雪',
                company: '智能制造',
                email: 'zhaoxue@smart.com',
                phone: '13800138004',
                product: '智能监控系统',
                originalPrice: 320000,
                discount: 0,
                amount: 320000,
                isDelivered: false,
                deliveryPeriod: 60,
                paymentPeriod: 30,
                notes: '客户要求加急处理',
                createdAt: '2026-01-25'
            }
        ];
        saveData();
    }
}

// 验证邮箱格式（必须是企业邮箱）
function validateEmail(email) {
    if (!email) return false;
    // 转换为小写进行比较
    return email.toLowerCase().endsWith(COMPANY_EMAIL_DOMAIN);
}

// 登录功能
function login(email, password) {
    // 验证邮箱格式
    if (!validateEmail(email)) {
        alert(`请使用公司企业邮箱（${COMPANY_EMAIL_DOMAIN}）登录！`);
        return false;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainSystem();
        return true;
    } else {
        alert('邮箱或密码错误！');
        return false;
    }
}

// 注册功能
function register(name, email, password) {
    // 验证邮箱格式
    if (!validateEmail(email)) {
        alert(`请使用公司企业邮箱（${COMPANY_EMAIL_DOMAIN}）注册！\n例如：yourname${COMPANY_EMAIL_DOMAIN}`);
        return false;
    }

    // 检查邮箱是否已注册
    if (users.some(u => u.email === email)) {
        alert('该邮箱已被注册！');
        return false;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        role: 'user', // 默认为普通用户
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('注册成功！请登录');
    toggleAuthMode(); // 切换到登录界面
    return true;
}

// 退出登录
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAuthPage();
}

// 切换登录/注册界面
function toggleAuthMode() {
    const loginContainer = document.getElementById('login-form-container');
    const registerContainer = document.getElementById('register-form-container');
    
    if (loginContainer.classList.contains('hidden')) {
        loginContainer.classList.remove('hidden');
        registerContainer.classList.add('hidden');
    } else {
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    }
}

// 显示认证页面
function showAuthPage() {
    document.getElementById('auth-page').classList.remove('hidden');
    document.getElementById('main-system').classList.add('hidden');
}

// 显示主系统界面
function showMainSystem() {
    document.getElementById('auth-page').classList.add('hidden');
    document.getElementById('main-system').classList.remove('hidden');
    document.getElementById('main-system').classList.add('flex');
    
    // 更新用户信息显示
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-role').textContent = currentUser.role === 'admin' ? '管理员' : '普通用户';
    
    // 默认显示仪表盘
    showPage('dashboard');
}

// 检查客户查重（用于普通用户）
// 返回 true 表示存在重复，false 表示无重复
function checkCustomerDuplicate(email, phone, excludeId = null) {
    // 管理员不需要查重
    if (currentUser.role === 'admin') {
        return false;
    }
    
    return customers.some(customer => {
        // 如果是编辑模式，排除当前客户
        if (excludeId && customer.id === excludeId) {
            return false;
        }
        
        // 检查邮箱重复
        if (email && customer.email && customer.email.toLowerCase() === email.toLowerCase()) {
            return true;
        }
        
        // 检查电话重复
        if (phone && customer.phone && customer.phone === phone) {
            return true;
        }
        
        return false;
    });
}

// 过滤客户数据（权限控制）
function getVisibleCustomers() {
    if (!currentUser) return [];
    
    if (currentUser.role === 'admin') {
        // 管理员可以看到所有客户
        return customers;
    } else {
        // 普通用户只能看到自己创建的客户
        return customers.filter(c => c.createdBy === currentUser.id);
    }
}

// 统计数据计算（基于可见数据）
function calculateStats() {
    const visibleCustomers = getVisibleCustomers();
    const totalCustomers = visibleCustomers.length;
    const activeCustomers = visibleCustomers.filter(c => c.status === 'active').length;
    
    // 计算本月交互（只统计可见客户的交互）
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const visibleCustomerIds = visibleCustomers.map(c => c.id);
    const monthInteractions = interactions.filter(i => 
        i.date.startsWith(currentMonth) && visibleCustomerIds.includes(i.customerId)
    ).length;
    
    // 计算总成交额（只统计可见客户的商机）
    // 注意：这里的逻辑简化了，实际上应该关联商机表
    // 这里我们统计商机表中的金额
    // 普通用户只能看到关联自己客户的商机（或者自己创建的商机，这里简化为关联客户）
    let totalRevenue = 0;
    
    if (currentUser.role === 'admin') {
        totalRevenue = opportunities.reduce((sum, op) => sum + (op.isDelivered ? parseFloat(op.amount) : 0), 0);
    } else {
        // 找出属于当前用户客户的商机
        // 首先获取当前用户所有客户的名称或ID
        const myCustomerNames = visibleCustomers.map(c => c.name);
        // 过滤商机
        const myOpportunities = opportunities.filter(op => myCustomerNames.includes(op.customerName));
        totalRevenue = myOpportunities.reduce((sum, op) => sum + (op.isDelivered ? parseFloat(op.amount) : 0), 0);
    }
    
    document.getElementById('stat-total-customers').textContent = totalCustomers;
    document.getElementById('stat-active-customers').textContent = activeCustomers;
    document.getElementById('stat-interactions').textContent = monthInteractions;
    document.getElementById('stat-revenue').textContent = '¥' + totalRevenue.toLocaleString();
}

// 保存数据到LocalStorage
function saveData() {
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('interactions', JSON.stringify(interactions));
    localStorage.setItem('opportunities', JSON.stringify(opportunities));
    // 用户数据在注册时已单独保存
}

// 页面切换
function showPage(pageId) {
    // 隐藏所有视图
    ['dashboard-view', 'customers-view', 'opportunities-view', 'interactions-view', 'analysis-view'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    
    // 移除所有导航激活状态
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        link.classList.remove('bg-purple-50');
        link.classList.remove('text-purple-600');
    });
    
    // 显示目标视图
    document.getElementById(`${pageId}-view`).classList.remove('hidden');
    
    // 激活对应导航
    const navLink = document.getElementById(`nav-${pageId}`);
    navLink.classList.add('active');
    
    // 更新标题
    const titles = {
        'dashboard': '数据概览',
        'customers': '客户列表',
        'opportunities': '商机管理',
        'interactions': '交互记录',
        'analysis': '数据分析'
    };
    document.getElementById('page-title').textContent = titles[pageId];
    
    // 刷新数据
    if (pageId === 'dashboard') {
        calculateStats();
        initCharts();
    } else if (pageId === 'customers') {
        renderCustomerList();
    } else if (pageId === 'opportunities') {
        renderOpportunityList();
    } else if (pageId === 'interactions') {
        renderInteractionList();
    } else if (pageId === 'analysis') {
        initAnalysisCharts();
    }
}

// 渲染客户列表
function renderCustomerList() {
    const tbody = document.getElementById('customer-list-body');
    tbody.innerHTML = '';
    
    const searchTerm = document.getElementById('customer-search').value.toLowerCase();
    const statusFilter = document.getElementById('customer-filter-status').value;
    
    // 获取当前用户可见的客户
    let visibleCustomers = getVisibleCustomers();
    
    const filteredCustomers = visibleCustomers.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm) || 
                            c.company.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    
    document.getElementById('showing-count').textContent = filteredCustomers.length;
    
    filteredCustomers.forEach(customer => {
        const tr = document.createElement('tr');
        tr.className = 'table-row border-b border-gray-50';
        
        // 处理销售负责人标签
        let salesOwnersHtml = '';
        if (customer.salesOwners) {
            const owners = customer.salesOwners.split(/[,，、]/).map(s => s.trim()).filter(s => s);
            salesOwnersHtml = owners.map(owner => 
                `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mr-1 mb-1">
                    <i class="fas fa-user-tie mr-1 text-[10px]"></i>${owner}
                </span>`
            ).join('');
        }
        
        // 处理感兴趣产品标签
        let productsHtml = '';
        if (customer.interestedProducts) {
            const products = customer.interestedProducts.split(/[,，、]/).map(p => p.trim()).filter(p => p);
            productsHtml = products.map(product => 
                `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-1 mb-1">
                    ${product}
                </span>`
            ).join('');
        }

        const statusColors = {
            'active': 'bg-green-100 text-green-800',
            'potential': 'bg-blue-100 text-blue-800',
            'inactive': 'bg-gray-100 text-gray-800'
        };
        
        const statusText = {
            'active': '活跃',
            'potential': '潜在',
            'inactive': '休眠'
        };
        
        tr.innerHTML = `
            <td class="py-4 pl-4">
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                        ${customer.name.charAt(0)}
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">${customer.name}</p>
                        <p class="text-xs text-gray-500">ID: ${customer.id}</p>
                    </div>
                </div>
            </td>
            <td class="py-4">
                <p class="text-sm text-gray-900">${customer.company}</p>
            </td>
            <td class="py-4">
                <div class="text-sm text-gray-500">
                    <p><i class="fas fa-envelope w-4"></i> ${customer.email}</p>
                    <p><i class="fas fa-phone w-4"></i> ${customer.phone}</p>
                </div>
            </td>
            <td class="py-4">
                <div class="flex flex-wrap max-w-[150px]">
                    ${salesOwnersHtml || '<span class="text-gray-400 text-xs">-</span>'}
                </div>
            </td>
            <td class="py-4">
                <div class="flex flex-wrap max-w-[200px]">
                    ${productsHtml || '<span class="text-gray-400 text-xs">-</span>'}
                </div>
            </td>
            <td class="py-4">
                <span class="px-3 py-1 rounded-full text-xs font-medium ${statusColors[customer.status]}">
                    ${statusText[customer.status]}
                </span>
            </td>
            <td class="py-4 text-sm text-gray-500">
                ${customer.createdAt}
            </td>
            <td class="py-4 pr-4 text-right">
                <button onclick="editCustomer(${customer.id})" class="text-blue-600 hover:text-blue-800 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteCustomer(${customer.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 渲染商机列表
function renderOpportunityList() {
    const tbody = document.getElementById('opportunity-list-body');
    tbody.innerHTML = '';
    
    const searchTerm = document.getElementById('opportunity-search').value.toLowerCase();
    const statusFilter = document.getElementById('opportunity-filter-status').value;
    
    // 权限过滤：普通用户只能看到自己客户的商机
    let visibleOpportunities = opportunities;
    if (currentUser.role !== 'admin') {
        const myCustomerNames = getVisibleCustomers().map(c => c.name);
        visibleOpportunities = opportunities.filter(op => myCustomerNames.includes(op.customerName));
    }
    
    const filteredOpportunities = visibleOpportunities.filter(op => {
        const matchesSearch = op.customerName.toLowerCase().includes(searchTerm) || 
                            op.product.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || String(op.isDelivered) === statusFilter;
        return matchesSearch && matchesStatus;
    });
    
    filteredOpportunities.forEach(op => {
        const tr = document.createElement('tr');
        tr.className = 'table-row border-b border-gray-50';
        
        // 计算折扣显示
        const discountDisplay = op.discount > 0 
            ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 ml-2">
                 ${op.discount}折
               </span>` 
            : '';
            
        tr.innerHTML = `
            <td class="py-4 pl-4">
                <div>
                    <p class="text-sm font-medium text-gray-900">${op.customerName}</p>
                    <p class="text-xs text-gray-500">${op.company}</p>
                </div>
            </td>
            <td class="py-4">
                <p class="text-sm text-gray-900">${op.product}</p>
            </td>
            <td class="py-4">
                <div>
                    <p class="text-sm text-gray-500 line-through">¥${parseFloat(op.originalPrice).toLocaleString()}</p>
                    ${discountDisplay}
                </div>
            </td>
            <td class="py-4">
                <p class="text-sm font-bold text-gray-900">¥${parseFloat(op.amount).toLocaleString()}</p>
            </td>
            <td class="py-4">
                <div class="text-xs text-gray-500">
                    <p>交付: ${op.deliveryPeriod}天</p>
                    <p>回款: ${op.paymentPeriod}天</p>
                </div>
            </td>
            <td class="py-4">
                <span class="px-3 py-1 rounded-full text-xs font-medium ${op.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    ${op.isDelivered ? '已交付' : '未交付'}
                </span>
            </td>
            <td class="py-4 pr-4 text-right">
                <button onclick="editOpportunity(${op.id})" class="text-blue-600 hover:text-blue-800 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteOpportunity(${op.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 渲染交互记录
function renderInteractionList() {
    const listBody = document.getElementById('interaction-list-body');
    listBody.innerHTML = '';
    
    // 权限过滤：普通用户只能看到自己客户的交互记录
    let visibleInteractions = interactions;
    if (currentUser.role !== 'admin') {
        const myCustomerIds = getVisibleCustomers().map(c => c.id);
        visibleInteractions = interactions.filter(i => myCustomerIds.includes(i.customerId));
    }
    
    // 按时间倒序
    const sortedInteractions = [...visibleInteractions].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedInteractions.forEach(interaction => {
        const div = document.createElement('div');
        div.className = 'glass-effect p-4 rounded-xl border-l-4 border-purple-500';
        
        const typeIcons = {
            '电话': 'fa-phone',
            '邮件': 'fa-envelope',
            '会议': 'fa-users',
            '拜访': 'fa-car'
        };
        
        div.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div class="flex items-center space-x-2">
                    <span class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <i class="fas ${typeIcons[interaction.type]} text-sm"></i>
                    </span>
                    <span class="font-medium text-gray-800">${interaction.type} - ${interaction.customerName}</span>
                </div>
                <span class="text-sm text-gray-500">${interaction.date}</span>
            </div>
            <p class="text-gray-600 text-sm pl-10">${interaction.content}</p>
        `;
        listBody.appendChild(div);
    });
}

// 初始化图表
function initCharts() {
    // 客户增长趋势图
    const growthChart = echarts.init(document.getElementById('chart-growth'));
    const growthOption = {
        animation: true,
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['8月', '9月', '10月', '11月', '12月', '1月'],
            axisLine: { lineStyle: { color: '#9ca3af' } }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: '#f3f4f6' } }
        },
        series: [{
            data: [5, 8, 12, 15, 20, 25], // 示例数据
            type: 'line',
            smooth: true,
            symbolSize: 8,
            itemStyle: { color: '#7c3aed' },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(124, 58, 237, 0.3)' },
                    { offset: 1, color: 'rgba(124, 58, 237, 0)' }
                ])
            }
        }]
    };
    growthChart.setOption(growthOption);

    // 客户来源分布图
    const sourceChart = echarts.init(document.getElementById('chart-source'));
    
    // 基于可见数据计算来源分布
    const visibleCustomers = getVisibleCustomers();
    const sourceData = {};
    visibleCustomers.forEach(c => {
        sourceData[c.source] = (sourceData[c.source] || 0) + 1;
    });
    
    const pieData = Object.keys(sourceData).map(key => ({
        name: key,
        value: sourceData[key]
    }));
    
    const sourceOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '0%',
            left: 'center'
        },
        series: [{
            name: '客户来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: { show: false },
            data: pieData.length > 0 ? pieData : [{name: '无数据', value: 0}]
        }]
    };
    sourceChart.setOption(sourceOption);
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        growthChart.resize();
        sourceChart.resize();
    });
}

// 初始化分析图表
function initAnalysisCharts() {
    // 客户状态分布
    const statusChart = echarts.init(document.getElementById('chart-status-dist'));
    
    const visibleCustomers = getVisibleCustomers();
    const statusData = {
        'active': 0,
        'potential': 0,
        'inactive': 0
    };
    
    visibleCustomers.forEach(c => {
        if (statusData[c.status] !== undefined) {
            statusData[c.status]++;
        }
    });
    
    const statusOption = {
        title: {
            text: '客户状态分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '状态',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: statusData.active, name: '活跃', itemStyle: { color: '#10b981' } },
                    { value: statusData.potential, name: '潜在', itemStyle: { color: '#3b82f6' } },
                    { value: statusData.inactive, name: '休眠', itemStyle: { color: '#9ca3af' } }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    statusChart.setOption(statusOption);
    
    // 交互趋势（简化版）
    const trendChart = echarts.init(document.getElementById('chart-interaction-trend'));
    const trendOption = {
        title: {
            text: '近6个月交互次数',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['9月', '10月', '11月', '12月', '1月', '2月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '交互次数',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330],
                itemStyle: { color: '#8b5cf6' }
            }
        ]
    };
    trendChart.setOption(trendOption);
    
    window.addEventListener('resize', () => {
        statusChart.resize();
        trendChart.resize();
    });
}

// 模态框操作
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    // 重置表单
    const formId = modalId.replace('-modal', '-form');
    document.getElementById(formId).reset();
    currentEditId = null;
    
    // 如果是客户模态框，重置查重提示
    if (modalId === 'customer-modal') {
        document.getElementById('email-check-msg').textContent = '将自动检查重复';
        document.getElementById('email-check-msg').className = 'text-xs text-gray-500 mt-1';
        document.getElementById('phone-check-msg').textContent = '将自动检查重复';
        document.getElementById('phone-check-msg').className = 'text-xs text-gray-500 mt-1';
    }
}

// 客户增删改
document.getElementById('add-customer-btn').addEventListener('click', () => {
    document.getElementById('modal-title').textContent = '添加新客户';
    openModal('customer-modal');
});

// 客户查重逻辑
function setupDuplicateCheck() {
    const emailInput = document.getElementById('customer-email');
    const phoneInput = document.getElementById('customer-phone');
    
    const checkHandler = () => {
        // 管理员不显示查重提示
        if (currentUser.role === 'admin') return;
        
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        
        // 检查邮箱
        if (email) {
            const isDuplicate = checkCustomerDuplicate(email, null, currentEditId);
            const msgEl = document.getElementById('email-check-msg');
            if (isDuplicate) {
                msgEl.textContent = '❌ 该邮箱已存在！';
                msgEl.className = 'text-xs text-red-500 mt-1 font-bold';
            } else {
                msgEl.textContent = '✅ 邮箱可用';
                msgEl.className = 'text-xs text-green-500 mt-1';
            }
        }
        
        // 检查电话
        if (phone) {
            const isDuplicate = checkCustomerDuplicate(null, phone, currentEditId);
            const msgEl = document.getElementById('phone-check-msg');
            if (isDuplicate) {
                msgEl.textContent = '❌ 该电话已存在！';
                msgEl.className = 'text-xs text-red-500 mt-1 font-bold';
            } else {
                msgEl.textContent = '✅ 电话可用';
                msgEl.className = 'text-xs text-green-500 mt-1';
            }
        }
    };
    
    emailInput.addEventListener('blur', checkHandler);
    phoneInput.addEventListener('blur', checkHandler);
}

document.getElementById('customer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('customer-name').value;
    const company = document.getElementById('customer-company').value;
    const email = document.getElementById('customer-email').value;
    const phone = document.getElementById('customer-phone').value;
    const source = document.getElementById('customer-source').value;
    const status = document.getElementById('customer-status').value;
    const salesOwners = document.getElementById('customer-sales-owners').value;
    const interestedProducts = document.getElementById('customer-interested-products').value;
    const notes = document.getElementById('customer-notes').value;
    
    // 提交前的最终查重（仅针对普通用户）
    if (currentUser.role !== 'admin') {
        const isDuplicate = checkCustomerDuplicate(email, phone, currentEditId);
        if (isDuplicate) {
            alert('该客户已存在（邮箱或电话重复），无法添加！');
            return;
        }
    }
    
    if (currentEditId) {
        // 编辑现有客户
        const index = customers.findIndex(c => c.id === currentEditId);
        if (index !== -1) {
            // 保持原有的创建信息
            const originalCreatedBy = customers[index].createdBy;
            const originalCreatedAt = customers[index].createdAt;
            
            customers[index] = {
                id: currentEditId,
                name, company, email, phone, source, status, notes,
                salesOwners, interestedProducts,
                createdAt: originalCreatedAt,
                createdBy: originalCreatedBy,
                value: customers[index].value // 保持原有的价值
            };
        }
    } else {
        // 添加新客户
        const newCustomer = {
            id: Date.now(),
            name, company, email, phone, source, status, notes,
            salesOwners, interestedProducts,
            createdAt: new Date().toISOString().split('T')[0],
            value: 0,
            createdBy: currentUser.id // 记录创建者
        };
        customers.push(newCustomer);
    }
    
    saveData();
    closeModal('customer-modal');
    renderCustomerList();
    calculateStats(); // 刷新统计
});

function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (customer) {
        currentEditId = id;
        document.getElementById('modal-title').textContent = '编辑客户';
        
        document.getElementById('customer-name').value = customer.name;
        document.getElementById('customer-company').value = customer.company;
        document.getElementById('customer-email').value = customer.email;
        document.getElementById('customer-phone').value = customer.phone;
        document.getElementById('customer-source').value = customer.source;
        document.getElementById('customer-status').value = customer.status;
        document.getElementById('customer-sales-owners').value = customer.salesOwners || '';
        document.getElementById('customer-interested-products').value = customer.interestedProducts || '';
        document.getElementById('customer-notes').value = customer.notes || '';
        
        openModal('customer-modal');
    }
}

function deleteCustomer(id) {
    if (confirm('确定要删除这个客户吗？')) {
        customers = customers.filter(c => c.id !== id);
        saveData();
        renderCustomerList();
        calculateStats();
    }
}

// 商机增删改
document.getElementById('add-opportunity-btn').addEventListener('click', () => {
    document.getElementById('opportunity-modal-title').textContent = '添加商机';
    openModal('opportunity-modal');
});

// 监听折扣和原价变化，自动计算合同金额
function setupPriceCalculation() {
    const originalPriceInput = document.getElementById('opportunity-original-price');
    const discountInput = document.getElementById('opportunity-discount');
    const amountInput = document.getElementById('opportunity-amount');
    
    const calculateAmount = () => {
        const originalPrice = parseFloat(originalPriceInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0; // 0-100
        
        let finalAmount = originalPrice;
        if (discount > 0 && discount <= 100) {
            // 折扣计算：例如10表示9折，即减去10%
            // 或者10表示1折？通常CRM中折扣率指的是减免比例还是实付比例？
            // 假设：用户输入10代表9折（即优惠10%），输入20代表8折
            // 如果用户习惯输入90代表9折，逻辑需调整。
            // 根据提示 "10表示9折"，说明输入的是优惠百分比
            // 所以 10 => 价格 * (100-10)%
            finalAmount = originalPrice * (100 - discount) / 100;
        }
        
        amountInput.value = finalAmount.toFixed(2);
    };
    
    originalPriceInput.addEventListener('input', calculateAmount);
    discountInput.addEventListener('input', calculateAmount);
}

document.getElementById('opportunity-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const customerName = document.getElementById('opportunity-customer-name').value;
    const company = document.getElementById('opportunity-company').value;
    const email = document.getElementById('opportunity-email').value;
    const phone = document.getElementById('opportunity-phone').value;
    const product = document.getElementById('opportunity-product').value;
    const originalPrice = parseFloat(document.getElementById('opportunity-original-price').value);
    const discount = parseFloat(document.getElementById('opportunity-discount').value) || 0;
    const amount = parseFloat(document.getElementById('opportunity-amount').value);
    const deliveryPeriod = parseInt(document.getElementById('opportunity-delivery-period').value);
    const paymentPeriod = parseInt(document.getElementById('opportunity-payment-period').value);
    const isDelivered = document.querySelector('input[name="delivery-status"]:checked').value === 'true';
    const notes = document.getElementById('opportunity-notes').value;
    
    if (currentEditId) {
        const index = opportunities.findIndex(o => o.id === currentEditId);
        if (index !== -1) {
            opportunities[index] = {
                ...opportunities[index],
                customerName, company, email, phone, product,
                originalPrice, discount, amount,
                deliveryPeriod, paymentPeriod, isDelivered, notes
            };
        }
    } else {
        const newOpportunity = {
            id: Date.now(),
            customerName, company, email, phone, product,
            originalPrice, discount, amount,
            deliveryPeriod, paymentPeriod, isDelivered, notes,
            createdAt: new Date().toISOString().split('T')[0]
        };
        opportunities.push(newOpportunity);
    }
    
    saveData();
    closeModal('opportunity-modal');
    renderOpportunityList();
    calculateStats();
});

function editOpportunity(id) {
    const op = opportunities.find(o => o.id === id);
    if (op) {
        currentEditId = id;
        document.getElementById('opportunity-modal-title').textContent = '编辑商机';
        
        document.getElementById('opportunity-customer-name').value = op.customerName;
        document.getElementById('opportunity-company').value = op.company;
        document.getElementById('opportunity-email').value = op.email;
        document.getElementById('opportunity-phone').value = op.phone;
        document.getElementById('opportunity-product').value = op.product;
        document.getElementById('opportunity-original-price').value = op.originalPrice;
        document.getElementById('opportunity-discount').value = op.discount;
        document.getElementById('opportunity-amount').value = op.amount;
        document.getElementById('opportunity-delivery-period').value = op.deliveryPeriod;
        document.getElementById('opportunity-payment-period').value = op.paymentPeriod;
        
        // 设置单选按钮
        const radios = document.getElementsByName('delivery-status');
        for (let radio of radios) {
            if (radio.value === String(op.isDelivered)) {
                radio.checked = true;
                break;
            }
        }
        
        document.getElementById('opportunity-notes').value = op.notes || '';
        
        openModal('opportunity-modal');
    }
}

function deleteOpportunity(id) {
    if (confirm('确定要删除这个商机吗？')) {
        opportunities = opportunities.filter(o => o.id !== id);
        saveData();
        renderOpportunityList();
        calculateStats();
    }
}

// 交互记录操作
document.getElementById('add-interaction-btn').addEventListener('click', () => {
    // 填充客户下拉框
    const select = document.getElementById('interaction-customer');
    select.innerHTML = '<option value="">请选择客户</option>';
    
    const visibleCustomers = getVisibleCustomers();
    visibleCustomers.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.name;
        select.appendChild(option);
    });
    
    openModal('interaction-modal');
});

document.getElementById('interaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const customerId = parseInt(document.getElementById('interaction-customer').value);
    const customer = customers.find(c => c.id === customerId);
    const type = document.getElementById('interaction-type').value;
    const content = document.getElementById('interaction-content').value;
    
    const newInteraction = {
        id: Date.now(),
        customerId,
        customerName: customer.name,
        type,
        content,
        date: new Date().toISOString().split('T')[0]
    };
    
    interactions.push(newInteraction);
    saveData();
    closeModal('interaction-modal');
    renderInteractionList();
    calculateStats();
});

// 通用模态框关闭
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal.id);
    });
});

// 点击模态框外部关闭
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};

// 认证相关事件监听
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    login(email, password);
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-password-confirm').value;
    
    if (password !== confirmPassword) {
        alert('两次输入的密码不一致！');
        return;
    }
    
    register(name, email, password);
});

document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    toggleAuthMode();
});

document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    toggleAuthMode();
});

document.getElementById('logout-btn').addEventListener('click', logout);

// 导航事件监听
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = e.currentTarget.id.replace('nav-', '');
        showPage(pageId);
    });
});

// 监听搜索框
['customer', 'opportunity'].forEach(type => {
    document.getElementById(`${type}-search`).addEventListener('input', () => {
        if (type === 'customer') renderCustomerList();
        else renderOpportunityList();
    });
    
    document.getElementById(`${type}-filter-status`).addEventListener('change', () => {
        if (type === 'customer') renderCustomerList();
        else renderOpportunityList();
    });
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    setupPriceCalculation();
    setupDuplicateCheck();
});
```
