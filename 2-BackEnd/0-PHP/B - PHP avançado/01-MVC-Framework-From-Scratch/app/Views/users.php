<div class="card">
    <h1>Users List</h1>
    <?php if (!empty($error)): ?>
        <p><?php echo htmlspecialchars($error); ?></p>
    <?php endif; ?>
    <ul>
        <?php foreach ($users as $user): ?>
            <li>
                <strong><?php echo htmlspecialchars($user['name']); ?></strong> 
                (<?php echo htmlspecialchars($user['email']); ?>)
            </li>
        <?php endforeach; ?>
    </ul>
</div>
